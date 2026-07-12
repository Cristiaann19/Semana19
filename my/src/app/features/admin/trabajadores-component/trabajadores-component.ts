import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SortEvent } from 'primeng/api';
import { TrabajadorService, Trabajador, TrabajadorRequest } from '../../../core/services/trabajador.service';

@Component({
  selector: 'app-trabajadores-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DialogModule,
    DatePickerModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './trabajadores-component.html',
  styleUrl: './trabajadores-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrabajadoresComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  initialValue: Trabajador[] = [];
  isSorted: boolean | null = null;
  private resetting = false;

  trabajadores: Trabajador[] = [];
  trabajadoresFiltrados: Trabajador[] = [];
  terminoBusqueda = '';
  showModal = false;
  editingId: number | null = null;
  mostrarConfirmarEstado = false;
  empleadoCambiandoEstado: Trabajador | null = null;
  loading = false;
  error = '';

  form: FormGroup;

  generos = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Femenino', value: 'FEMENINO' },
  ];

  roles = [
    { label: 'USER', value: 'USER' },
    { label: 'ADMIN', value: 'ADMIN' },
  ];

  constructor(
    private trabajadorService: TrabajadorService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoMaterno: ['', [Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      direccion: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      activo: [true],
      usuarioUsername: ['', [Validators.minLength(4)]],
      usuarioPassword: ['', [Validators.minLength(6)]],
      usuarioRol: ['USER'],
    });
  }

  ngOnInit(): void {
    this.loadTrabajadores();
  }

  loadTrabajadores(): void {
    this.trabajadorService.findAll().subscribe({
      next: (data) => {
        this.trabajadores = data;
        this.aplicarFiltros();
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Error al cargar trabajadores';
        this.cdr.markForCheck();
      },
    });
  }

  aplicarFiltros(): void {
    let res = [...this.trabajadores];
    const t = this.terminoBusqueda.toLowerCase().trim();
    if (t) {
      res = res.filter(
        (e) =>
          e.nombre.toLowerCase().includes(t) ||
          e.apellidoPaterno.toLowerCase().includes(t) ||
          e.apellidoMaterno.toLowerCase().includes(t) ||
          e.dni.includes(t) ||
          e.email.toLowerCase().includes(t) ||
          e.telefono.includes(t) ||
          e.usuario?.username.toLowerCase().includes(t),
      );
    }
    this.trabajadoresFiltrados = res;
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
      this.trabajadoresFiltrados = [...this.initialValue];
      this.dt.reset();
      this.cdr.markForCheck();
      setTimeout(() => { this.resetting = false; }, 0);
    }
  }

  private sortTableData(event: SortEvent): void {
    this.trabajadoresFiltrados.sort((data1, data2) => {
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
    this.form.reset({ activo: true, genero: '', usuarioRol: 'USER' });
    this.showModal = true;
  }

  abrirEditar(trabajador: Trabajador): void {
    this.editingId = trabajador.id;
    this.form.reset({
      nombre: trabajador.nombre,
      apellidoPaterno: trabajador.apellidoPaterno,
      apellidoMaterno: trabajador.apellidoMaterno,
      dni: trabajador.dni,
      telefono: trabajador.telefono,
      direccion: trabajador.direccion,
      email: trabajador.email,
      fechaNacimiento: trabajador.fechaNacimiento,
      genero: trabajador.genero,
      fechaIngreso: trabajador.fechaIngreso,
      activo: trabajador.activo,
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
    const fv = this.form.value;
    const req: TrabajadorRequest = {
      nombre: fv.nombre,
      apellidoPaterno: fv.apellidoPaterno,
      apellidoMaterno: fv.apellidoMaterno,
      dni: fv.dni,
      telefono: fv.telefono,
      direccion: fv.direccion,
      email: fv.email,
      fechaNacimiento: fv.fechaNacimiento,
      genero: fv.genero,
      fechaIngreso: fv.fechaIngreso,
      activo: fv.activo,
    };

    if (!this.editingId && fv.usuarioUsername && fv.usuarioPassword) {
      req.usuario = {
        username: fv.usuarioUsername,
        password: fv.usuarioPassword,
        rol: fv.usuarioRol || 'USER',
      };
    }

    const obs = this.editingId
      ? this.trabajadorService.update(this.editingId, req)
      : this.trabajadorService.create(req);

    obs.subscribe({
      next: () => {
        this.loadTrabajadores();
        this.closeModal();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  confirmarCambiarEstado(t: Trabajador): void {
    this.empleadoCambiandoEstado = t;
    this.mostrarConfirmarEstado = true;
  }

  closeConfirmDialog(): void {
    this.mostrarConfirmarEstado = false;
    this.empleadoCambiandoEstado = null;
  }

  toggleEstado(): void {
    const t = this.empleadoCambiandoEstado;
    if (!t) return;

    this.trabajadorService.toggleEstado(t.id).subscribe({
      next: () => {
        this.loadTrabajadores();
        this.mostrarConfirmarEstado = false;
        this.empleadoCambiandoEstado = null;
      },
      error: () => {
        this.error = 'Error al cambiar estado';
        this.cdr.markForCheck();
      },
    });
  }

  obtenerAvatar(t: Trabajador): string {
    const n = t.nombre.charAt(0).toUpperCase();
    const a = t.apellidoPaterno.charAt(0).toUpperCase();
    return `${n}${a}`;
  }

  nombreCompleto(t: Trabajador): string {
    return `${t.nombre} ${t.apellidoPaterno}${t.apellidoMaterno ? ' ' + t.apellidoMaterno : ''}`;
  }
}
