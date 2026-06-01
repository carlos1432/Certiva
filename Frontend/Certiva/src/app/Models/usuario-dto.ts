export interface UsuarioDTO {
  id?: number;
  idUsuario?: number;
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  correo: string;
  estado: boolean;
  fechaRegistro: string;
  idTipoDocumento: number;
  idRol: number;
}
