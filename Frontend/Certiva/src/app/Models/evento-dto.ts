export interface EventoDTO {
  id?: number;
  idEvento?: number;
  titulo: string;
  descripcion: string;
  costo: number;
  cupos: number;
  fechaInicio: string;
  fechaFin: string;
  estado: boolean;
  idTipoEvento: number;
  idCreador: number;
}
