import type { Merchant } from "../types/Merchant";


export const merchantsMock: Merchant[] = [
  {
    id: 1,
    razonSocial: "Tech Solutions SAS",
    nit: "123456789",
    email: "contacto@tech.com",
    representante: "Carlos Pérez",
    estado: "ACTIVO",
  },
  {
    id: 2,
    razonSocial: "Market Pro",
    nit: "987654321",
    email: "info@market.com",
    representante: "Laura Gómez",
    estado: "PENDIENTE_VALIDACION",
  },
];
