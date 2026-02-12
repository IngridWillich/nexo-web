export type MerchantStatus =
  | "PENDIENTE_VALIDACION"
  | "ACTIVO"
  | "INACTIVO";

export interface Merchant {
  id: number;
  razonSocial: string;
  nit: string;
  email: string;
  telefono?: string;
  representante: string;
  estado: MerchantStatus;
}
