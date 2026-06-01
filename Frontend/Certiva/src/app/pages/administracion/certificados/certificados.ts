import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CertificadoService } from '../../../Services/certificado.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { EventoService } from '../../../Services/evento.service';
import { CertificadoDTO } from '../../../Models/certificado-dto';
import { CrearCertificadoDTO } from '../../../Models/crear-certificado-dto';
import { UsuarioDTO } from '../../../Models/usuario-dto';
import { EventoDTO } from '../../../Models/evento-dto';

@Component({
  selector: 'app-certificados',
  imports: [CommonModule, FormsModule],
  templateUrl: './certificados.html',
  styleUrl: './certificados.scss',
})
export class Certificados implements OnInit {
  certificados: CertificadoDTO[] = [];
  usuarios: UsuarioDTO[] = [];
  eventos: EventoDTO[] = [];

  nuevoCertificado: CrearCertificadoDTO = {
    tipoCertificado: '',
    codigoValidacion: '',
    idUsuario: 0,
    idEvento: 0,
  };

  constructor(
    private certificadoService: CertificadoService,
    private usuarioService: UsuarioService,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    this.listarCertificados();
    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        const primero = data[0] as UsuarioDTO & { idUsuario?: number };
        this.nuevoCertificado.idUsuario = primero?.idUsuario ?? primero?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar usuarios', err),
    });

    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        const primero = data[0] as EventoDTO & { idEvento?: number };
        this.nuevoCertificado.idEvento = primero?.idEvento ?? primero?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar eventos', err),
    });
  }

  listarCertificados(): void {
    this.certificadoService.listarCertificados().subscribe({
      next: (data) => (this.certificados = data),
      error: (err) => console.error('Error al listar certificados', err),
    });
  }

  crearCertificado(): void {
    this.certificadoService.crearCertificado(this.nuevoCertificado).subscribe({
      next: () => {
        this.nuevoCertificado = {
          tipoCertificado: '',
          codigoValidacion: '',
          idUsuario: this.nuevoCertificado.idUsuario,
          idEvento: this.nuevoCertificado.idEvento,
        };
        this.listarCertificados();
      },
      error: (err) => console.error('Error al crear certificado', err),
    });
  }
}
