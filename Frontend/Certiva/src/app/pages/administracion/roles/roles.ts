import { Component, OnInit } from '@angular/core';
import { RolDTO } from '../../../Models/rol-dto';
import { CrearRolDTO } from '../../../Models/crear-rol-dto';
import { RolService } from '../../../Services/rol.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles implements OnInit {

  roles: RolDTO[] = [];

  nuevoRol: CrearRolDTO = {
    nombre: '',
    descripcion: ''
  };

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.listarRoles();
  }

  // LISTAR
  listarRoles(): void {
    this.rolService.listarRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al listar roles', err);
      }
    });
  }

  //  CREAR
  crearRol(): void {
    this.rolService.crearRol(this.nuevoRol).subscribe({
      next: () => {
        this.nuevoRol = { nombre: '', descripcion: '' };
        this.listarRoles(); // refrescar lista
      },
      error: (err) => {
        console.error('Error al crear rol', err);
      }
    });
  }
}