// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router'; 

// CORREÇÃO: Usar o nome do arquivo correto (auth.service)
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, RouterLink], 
  
  // CORREÇÃO: Usar o nome do template que existe no disco
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
    
    title = 'Patas Douradas - Sistema de E-commerce';

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
      // Nenhuma lógica aqui
    }

    logout() {
      this.authService.logout();
    }
}