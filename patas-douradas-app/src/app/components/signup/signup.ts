// src/app/components/signup/signup.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service'; 
import { UsuarioDTO, TipoConta } from '../../models/usuario'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent implements OnInit {

  usuario: UsuarioDTO = {
    username: '',
    nome: '',
    email: '',
    senha: '',
    repeticaoSenha: '',
    tipoConta: TipoConta.CLIENTE 
  };
  
  tiposConta = [TipoConta.CLIENTE, TipoConta.VENDEDOR];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.usuario.senha !== this.usuario.repeticaoSenha) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.usuarioService.create(this.usuario).subscribe({
      next: (data) => {
        this.successMessage = `Usuário ${data.username} criado com sucesso! Redirecionando para o login...`;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message || 'Erro ao criar usuário. Verifique se o nome de usuário já existe.';
        console.error('Erro de Cadastro:', err);
      }
    });
  }
}