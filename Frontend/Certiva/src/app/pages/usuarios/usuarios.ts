import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { TipoDocumentoService } from '../../Services/tipo-documento.service';
import { RolService } from '../../Services/rol.service';
import { UsuarioDTO } from '../../Models/usuario-dto';
import { CrearUsuarioDTO } from '../../Models/crear-usuario-dto';
import { TipoDocumentoDTO } from '../../Models/tipo-documento-dto';
import { RolDTO } from '../../Models/rol-dto';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  usuarios: UsuarioDTO[] = [];
  tiposDocumento: TipoDocumentoDTO[] = [];
  roles: RolDTO[] = [];
  mostrarFormulario = false;

  nuevoUsuario: CrearUsuarioDTO = {
    nombres: '',
    apellidos: '',
    numeroDocumento: '',
    correo: '',
    contrasena: '',
    idTipoDocumento: 0,
    idRol: 0,
  };

  constructor(
    private usuarioService: UsuarioService,
    private tipoDocumentoService: TipoDocumentoService,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.tipoDocumentoService.listarTiposDocumento().subscribe({
      next: (data) => {
        this.tiposDocumento = data;
        const primero = data[0] as TipoDocumentoDTO & { idTipoDocumento?: number };
        this.nuevoUsuario.idTipoDocumento = primero?.idTipoDocumento ?? primero?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar tipos de documento', err),
    });

    this.rolService.listarRoles().subscribe({
      next: (data) => {
        this.roles = data;
        const primero = data[0] as RolDTO & { idRol?: number };
        this.nuevoUsuario.idRol = primero?.idRol ?? primero?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar roles', err),
    });
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error al listar usuarios', err),
    });
  }

  crearUsuario(): void {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.nuevoUsuario = {
          nombres: '',
          apellidos: '',
          numeroDocumento: '',
          correo: '',
          contrasena: '',
          idTipoDocumento: this.nuevoUsuario.idTipoDocumento,
          idRol: this.nuevoUsuario.idRol,
        };
        this.mostrarFormulario = false;
        this.listarUsuarios();
      },
      error: (err) => console.error('Error al crear usuario', err),
    });
  }
}
