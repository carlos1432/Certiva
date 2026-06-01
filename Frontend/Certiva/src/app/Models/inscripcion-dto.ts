export interface InscripcionDTO {
  id?: number;
  idInscripcion?: number;
  estado: string;
  pagoRealizado: boolean;
  fechaInscripcion: string;
  idUsuario: number;
  idEvento: number;
}
