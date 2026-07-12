import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-landing-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-component.html',
  styleUrl: './landing-component.css',
})
export class LandingComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  nombre = computed(() => this.user()?.username || '');
  nombreCompleto = computed(() => {
    const u = this.user();
    if (!u) return '';
    if (u.nombres) return `${u.nombres} ${u.apellidoPaterno || ''}`.trim();
    return u.username;
  });
  rol = computed(() => this.user()?.rol || '');
  inicial = computed(() => {
    const u = this.user();
    if (u?.nombres) return u.nombres.charAt(0).toUpperCase();
    return this.nombre().charAt(0).toUpperCase();
  });

  logout(): void {
    this.authService.logout();
  }
}
