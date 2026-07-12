import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SortEvent } from 'primeng/api';
import { UsuarioService, Usuario } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-usuarios-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DialogModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './usuarios-component.html',
  styleUrl: './usuarios-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  initialValue: Usuario[] = [];
  isSorted: boolean | null = null;
  private resetting = false;

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  terminoBusqueda = '';
  showModal = false;
  editingId: number | null = null;
  mostrarConfirmarEstado = false;
  usuarioCambiandoEstado: Usuario | null = null;
  loading = false;
  error = '';

  form: FormGroup;

  roles = [
    { label: 'USER', value: 'USER' },
    { label: 'ADMIN', value: 'ADMIN' },
  ];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      password: ['', [Validators.minLength(6)]],
      rol: ['USER', [Validators.required, Validators.pattern(/ADMIN|USER/)]],
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.aplicarFiltros();
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Error al cargar usuarios';
        this.cdr.markForCheck();
      },
    });
  }

  aplicarFiltros(): void {
    let res = [...this.usuarios];
    const t = this.terminoBusqueda.toLowerCase().trim();
    if (t) {
      res = res.filter(
        (u) =>
          u.username.toLowerCase().includes(t) ||
          u.rol.toLowerCase().includes(t) ||
          String(u.id).includes(t),
      );
    }
    this.usuariosFiltrados = res;
    this.initialValue = [...res];
    this.isSorted = null;
    this.cdr.markForCheck();
  }

  limpiarFiltros(): void {
    this.terminoBusqueda = '';
    this.aplicarFiltros();
  }

  customSort(event: SortEvent): void {
    if (this.resetting) return;
    if (this.isSorted == null) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted === true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else {
      this.isSorted = null;
      this.resetting = true;
      this.usuariosFiltrados = [...this.initialValue];
      this.dt.reset();
      this.cdr.markForCheck();
      setTimeout(() => { this.resetting = false; }, 0);
    }
  }

  private sortTableData(event: SortEvent): void {
    this.usuariosFiltrados.sort((data1, data2) => {
      const value1 = (data1 as any)[event.field!];
      const value2 = (data2 as any)[event.field!];
      let result: number;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else if (typeof value1 === 'boolean' && typeof value2 === 'boolean')
        result = value1 === value2 ? 0 : value1 ? 1 : -1;
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      return event.order! * result;
    });
    this.cdr.markForCheck();
  }

  abrirNuevo(): void {
    this.editingId = null;
    this.form.reset({ username: '', password: '', rol: 'USER' });
    this.showModal = true;
  }

  abrirEditar(usuario: Usuario): void {
    this.editingId = usuario.id;
    this.form.reset({
      username: usuario.username,
      password: '',
      rol: usuario.rol,
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.error = '';
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';
    const { username, password, rol } = this.form.value;

    if (this.editingId) {
      const req: any = { username, rol, activo: true };
      if (password) req.password = password;

      this.usuarioService.update(this.editingId, req).subscribe({
        next: () => {
          this.loadUsuarios();
          this.closeModal();
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al actualizar';
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
    } else {
      this.usuarioService.create({ username, password, rol }).subscribe({
        next: () => {
          this.loadUsuarios();
          this.closeModal();
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al crear';
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
    }
  }

  confirmarCambiarEstado(u: Usuario): void {
    this.usuarioCambiandoEstado = u;
    this.mostrarConfirmarEstado = true;
  }

  closeConfirmDialog(): void {
    this.mostrarConfirmarEstado = false;
    this.usuarioCambiandoEstado = null;
  }

  toggleEstado(): void {
    const u = this.usuarioCambiandoEstado;
    if (!u) return;

    this.usuarioService.toggleEstado(u.id).subscribe({
      next: () => {
        this.loadUsuarios();
        this.mostrarConfirmarEstado = false;
        this.usuarioCambiandoEstado = null;
      },
      error: () => {
        this.error = 'Error al cambiar estado';
        this.cdr.markForCheck();
      },
    });
  }
}
