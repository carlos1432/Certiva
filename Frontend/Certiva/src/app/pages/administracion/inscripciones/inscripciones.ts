import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionService } from '../../../Services/inscripcion.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { EventoService } from '../../../Services/evento.service';
import { InscripcionDTO } from '../../../Models/inscripcion-dto';
import { CrearInscripcionDTO } from '../../../Models/crear-inscripcion-dto';
import { UsuarioDTO } from '../../../Models/usuario-dto';
import { EventoDTO } from '../../../Models/evento-dto';

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.scss',
})
export class Inscripciones implements OnInit {
  inscripciones: InscripcionDTO[] = [];
  usuarios: UsuarioDTO[] = [];
  eventos: EventoDTO[] = [];

  nuevaInscripcion: CrearInscripcionDTO = {
    estado: 'ACTIVA',
    pagoRealizado: false,
    idUsuario: 0,
    idEvento: 0,
  };

  constructor(
    private inscripcionService: InscripcionService,
    private usuarioService: UsuarioService,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    this.listarInscripciones();
    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        const primero = data[0] as UsuarioDTO & { idUsuario?: number };
        this.nuevaInscripcion.idUsuario = primero?.idUsuario ?? primero?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar usuarios', err),
    });

    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        const primero = data[0] as EventoDTO & { idEvento?: number };
        this.nuevaInscripcion.idEvento = primero?.idEvento ?? primero?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar eventos', err),
    });
  }

  listarInscripciones(): void {
    this.inscripcionService.listarInscripciones().subscribe({
      next: (data) => (this.inscripciones = data),
      error: (err) => console.error('Error al listar inscripciones', err),
    });
  }

  crearInscripcion(): void {
    this.inscripcionService.crearInscripcion(this.nuevaInscripcion).subscribe({
      next: () => {
        this.nuevaInscripcion = {
          estado: 'ACTIVA',
          pagoRealizado: false,
          idUsuario: this.nuevaInscripcion.idUsuario,
          idEvento: this.nuevaInscripcion.idEvento,
        };
        this.listarInscripciones();
      },
      error: (err) => console.error('Error al crear inscripción', err),
    });
  }
}
