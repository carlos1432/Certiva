import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../Services/evento.service';
import { TipoEventoService } from '../../Services/tipo-evento.service';
import { AuthService } from '../../core/auth.service';
import { EventoDTO } from '../../Models/evento-dto';
import { CrearEventoDTO } from '../../Models/crear-evento-dto';
import { TipoEventoDTO } from '../../Models/tipo-evento-dto';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.scss',
})
export class Eventos implements OnInit {
  eventos: EventoDTO[] = [];
  tiposEvento: TipoEventoDTO[] = [];
  mostrarFormulario = false;

  conteoCursos = 0;
  conteoHackatones = 0;
  conteoFerias = 0;

  nuevoEvento: CrearEventoDTO = {
    titulo: '',
    descripcion: '',
    costo: 0,
    cupos: 0,
    fechaInicio: '',
    fechaFin: '',
    idTipoEvento: 0,
    idCreador: 0,
  };

  constructor(
    private eventoService: EventoService,
    private tipoEventoService: TipoEventoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const sesion = this.authService.obtenerSesion();
    this.nuevoEvento.idCreador = sesion?.idUsuario ?? 0;
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.tipoEventoService.listarTiposEvento().subscribe({
      next: (data) => {
        this.tiposEvento = data;
        const primero = data[0];
        this.nuevoEvento.idTipoEvento = primero?.idTipoEvento ?? primero?.id ?? 0;
        this.listarEventos();
      },
      error: (err) => console.error('Error al cargar tipos de evento', err),
    });
  }

  listarEventos(): void {
    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.calcularConteos();
      },
      error: (err) => console.error('Error al listar eventos', err),
    });
  }

  calcularConteos(): void {
    this.conteoCursos = this.contarPorTipo('curso');
    this.conteoHackatones = this.contarPorTipo('hackaton');
    this.conteoFerias = this.contarPorTipo('feria');
  }

  contarPorTipo(palabraClave: string): number {
    const tipo = this.tiposEvento.find((t) =>
      t.nombre.toLowerCase().includes(palabraClave)
    );
    if (!tipo) {
      return 0;
    }
    const idTipo = tipo.idTipoEvento ?? tipo.id;
    return this.eventos.filter((e) => e.idTipoEvento === idTipo).length;
  }

  crearEvento(): void {
    this.eventoService.crearEvento(this.nuevoEvento).subscribe({
      next: () => {
        this.nuevoEvento = {
          titulo: '',
          descripcion: '',
          costo: 0,
          cupos: 0,
          fechaInicio: '',
          fechaFin: '',
          idTipoEvento: this.nuevoEvento.idTipoEvento,
          idCreador: this.nuevoEvento.idCreador,
        };
        this.mostrarFormulario = false;
        this.listarEventos();
      },
      error: (err) => console.error('Error al crear evento', err),
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) {
      return '-';
    }
    return new Date(fecha).toLocaleDateString('es-CO');
  }
}
