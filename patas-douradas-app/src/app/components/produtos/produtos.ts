// src/app/components/produtos/produtos.ts

import { Component, OnInit } from '@angular/core'; 
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { RouterLink } from '@angular/router';

// Imports de Serviços e Modelos
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto'; 

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink], 
  templateUrl: './produtos.html', 
  styleUrls: ['./produtos.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService 
  ) { }

  ngOnInit(): void {
    // 1. Loga para garantir que a execução chegou aqui
    console.log("ProdutosComponent: Iniciando busca de produtos...");
    
    this.produtoService.findAll().subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
        console.log("Produtos carregados:", data);
      },
      error: (err: any) => { 
        this.errorMessage = 'Falha ao carregar produtos. Verifique se a API está ativa na porta 8080 e o CORS.';
        this.loading = false;
        console.error('Erro de Listagem:', err);
      }
    });
  }

  addToCart(produtoId: number): void {
    this.carrinhoService.adicionarItem(produtoId);
    alert('Produto adicionado ao carrinho!'); 
  }
}