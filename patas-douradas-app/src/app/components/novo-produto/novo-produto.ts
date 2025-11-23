// src/app/components/novo-produto/novo-produto.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';

// NOVO: Importa o Model Produto
import { Produto } from '../../models/produto'; // <-- CORREÇÃO: Importar o Model

@Component({
  selector: 'app-novo-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './novo-produto.html',
  styleUrls: ['./novo-produto.css']
})
export class NovoProdutoComponent implements OnInit {

  produtoForm!: FormGroup;
  sucessoMensagem: string = '';
  erroMensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]],
      estoque: [0, [Validators.required, Validators.min(1)]],
      imagemUrl: ['']
    });
  }

  onSubmit(): void {
    this.sucessoMensagem = '';
    this.erroMensagem = '';

    if (this.produtoForm.valid) {
      this.produtoService.create(this.produtoForm.value).subscribe({
        // CORREÇÃO: Tipar produtoCriado como Produto (resolve TS7006)
        next: (produtoCriado: Produto) => { 
          this.sucessoMensagem = `Produto '${produtoCriado.nome}' criado com sucesso!`;
          this.router.navigate(['/produtos']); 
        },
        // CORREÇÃO: Tipar o erro como 'any' (resolve TS7006)
        error: (err: any) => { 
          this.erroMensagem = 'Falha ao criar produto. Verifique se o Backend está rodando.';
          console.error(err);
        }
      });
    } else {
      this.erroMensagem = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }

}