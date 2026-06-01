import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../Services/usuario.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { RolService } from '../../../Services/rol.service';
import { CrearUsuarioDTO } from '../../../Models/crear-usuario-dto';
import { TipoDocumentoDTO } from '../../../Models/tipo-documento-dto';
import { RolDTO } from '../../../Models/rol-dto';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro implements OnInit {
  nuevoUsuario: CrearUsuarioDTO = {
    nombres: '',
    apellidos: '',
    numeroDocumento: '',
    correo: '',
    contrasena: '',
    idTipoDocumento: 0,
    idRol: 0,
  };

  confirmarContrasena = '';
  tiposDocumento: TipoDocumentoDTO[] = [];
  roles: RolDTO[] = [];
  errorMensaje = '';
  exitoMensaje = '';
  cargando = false;

  constructor(
    private usuarioService: UsuarioService,
    private tipoDocumentoService: TipoDocumentoService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        const estudiante = data.find((r) =>
          r.nombre.toLowerCase().includes('estudiante')
        );
        const rol = estudiante as RolDTO & { idRol?: number };
        this.nuevoUsuario.idRol = rol?.idRol ?? rol?.id ?? data[0]?.id ?? 0;
      },
      error: (err) => console.error('Error al cargar roles', err),
    });
  }

  crearCuenta(): void {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (this.nuevoUsuario.contrasena !== this.confirmarContrasena) {
      this.errorMensaje = 'Las contrasenas no coinciden';
      return;
    }

    this.cargando = true;
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.cargando = false;
        this.exitoMensaje = 'Cuenta creada correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = 'No se pudo crear la cuenta. Verifica los datos.';
        console.error('Error al registrar usuario', err);
      },
    });
  }
}
