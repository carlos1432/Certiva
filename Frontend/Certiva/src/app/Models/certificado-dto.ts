export interface CertificadoDTO {
  id?: number;
  idCertificado?: number;
  tipoCertificado: string;
  codigoValidacion: string;
  fechaEmision: string;
  idUsuario: number;
  idEvento: number;
}
