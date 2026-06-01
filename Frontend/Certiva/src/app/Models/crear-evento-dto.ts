export interface CrearEventoDTO {
  titulo: string;
  descripcion: string;
  costo: number;
  cupos: number;
  fechaInicio: string;
  fechaFin: string;
  idTipoEvento: number;
  idCreador: number;
}
