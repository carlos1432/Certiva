export interface CrearUsuarioDTO {
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  correo: string;
  contrasena: string;
  idTipoDocumento: number;
  idRol: number;
}
