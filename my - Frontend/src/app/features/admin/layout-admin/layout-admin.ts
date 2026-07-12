import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
})
export class LayoutAdmin {
  private authService = inject(AuthService);

  user = this.authService.user;
  nombre = computed(() => this.user()?.username || '');
  rol = computed(() => this.user()?.rol || '');
  inicial = computed(() => this.nombre().charAt(0).toUpperCase());

  logout(): void {
    this.authService.logout();
  }
}
