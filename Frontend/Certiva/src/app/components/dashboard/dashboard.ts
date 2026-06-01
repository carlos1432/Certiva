import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../Services/evento.service';
import { UsuarioService } from '../../Services/usuario.service';
import { CertificadoService } from '../../Services/certificado.service';
import { EventoDTO } from '../../Models/evento-dto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  totalEventos = 0;
  totalUsuarios = 0;
  totalCertificados = 0;
  ultimosEventos: EventoDTO[] = [];

  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private certificadoService: CertificadoService
  ) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.totalEventos = data.length;
        this.ultimosEventos = data.slice(0, 5);
      },
      error: (err) => console.error('Error al cargar eventos', err),
    });

    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => (this.totalUsuarios = data.length),
      error: (err) => console.error('Error al cargar usuarios', err),
    });

    this.certificadoService.listarCertificados().subscribe({
      next: (data) => (this.totalCertificados = data.length),
      error: (err) => console.error('Error al cargar certificados', err),
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) {
      return '-';
    }
    return new Date(fecha).toLocaleDateString('es-CO');
  }
}
