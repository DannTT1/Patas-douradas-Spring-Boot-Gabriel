// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login'; 
import { AppComponent } from './app.component'; 
import { ProdutosComponent } from './components/produtos/produtos';
import { NovoProdutoComponent } from './components/novo-produto/novo-produto'; 
import { authGuard } from './guards/auth-guard'; // Para proteger a rota

export const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutosComponent },
  
  // CORREÇÃO: Fornecer o 'component' para a rota protegida
  { 
    path: 'produtos/novo', 
    component: NovoProdutoComponent, // <-- Componente associado
    canActivate: [authGuard] 
  },
];