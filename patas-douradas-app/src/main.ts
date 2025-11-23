// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { authInterceptor } from './app/interceptors/auth'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    
    // 1. Fornece o HttpClient
    // 2. Adiciona o interceptor à cadeia de requisições
    provideHttpClient(withInterceptors([authInterceptor])), 
  ]
}).catch((err) => console.error(err));

