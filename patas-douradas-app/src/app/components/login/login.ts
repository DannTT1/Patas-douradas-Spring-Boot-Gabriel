// src/app/components/login/login.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 

// CORREÇÃO 1: Importar a interface 'Login'
import { Login } from '../../models/login'; 
import { Sessao } from '../../models/sessao';

// CORREÇÃO 2: Caminho correto do Serviço (assumindo que você o renomeou para auth.service.ts)
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  
  // CORREÇÃO 3: template/styles usam o nome real do arquivo sem o '.component' (login.html)
  templateUrl: './login.html', 
  styleUrls: ['./login.css']
})
export class LoginComponent {

  // O tipo 'Login' agora é reconhecido (resolvendo TS2304)
  credenciais: Login = { username: '', senha: '' };
  mensagemErro: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.mensagemErro = '';

    this.authService.login(this.credenciais).subscribe({
      next: (response: Sessao) => {
        if (response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/produtos']);
        } else if (response.mensagem) {
          this.mensagemErro = response.mensagem;
        }
      },
      // Tipagem explícita para evitar aviso (warning)
      error: (err: any) => { 
        if (err.status === 401) {
          this.mensagemErro = 'Falha no login: Usuário ou senha inválidos.';
        } else {
          this.mensagemErro = 'Ocorreu um erro na comunicação com o servidor.';
        }
        console.error('Erro de Autenticação:', err);
      }
    });
  }
}