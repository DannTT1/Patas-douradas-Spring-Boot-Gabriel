// src/app/components/carrinho/carrinho.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { PedidoService } from '../../services/pedido'; // Service para finalizar pedido
import { AuthService } from '../../services/auth.service';
import { CarrinhoItemLocal } from '../../models/carrinho-item-local'; 
import { CarrinhoValidadoDTO } from '../../models/carrinho-validado';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class CarrinhoComponent implements OnInit {

  itensLocal: CarrinhoItemLocal[] = [];
  carrinhoValidado: CarrinhoValidadoDTO | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensLocal = this.carrinhoService.getItems();
    // Valida o carrinho imediatamente ao carregar o componente
    if (this.itensLocal.length > 0) {
      this.validarCarrinho();
    }
  }

  validarCarrinho(): void {
    this.loading = true;
    this.errorMessage = '';

    // Chama o endpoint de validação no Spring Boot
    this.pedidoService.validarCarrinho(this.itensLocal).subscribe({
      next: (data) => {
        this.carrinhoValidado = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Erro ao validar carrinho. Possível estoque insuficiente ou API fora do ar.';
        this.loading = false;
        console.error('Erro de Validação:', err);
      }
    });
  }

  finalizarPedido(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Você precisa estar logado para finalizar o pedido.');
      this.router.navigate(['/login']);
      return;
    }
    
    // Simplesmente limpa o carrinho local após uma finalização (lógica real é mais complexa)
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['/pedidos/sucesso']); // Redireciona para a tela de sucesso (a ser criada)
  }

  // Método para remover um item (seria usado no template)
  removerItem(produtoId: number): void {
    // [Ação Opcional] Implementar remoção no CarrinhoService
    // Após remoção, chame: this.itensLocal = this.carrinhoService.getItems(); this.validarCarrinho();
  }
}