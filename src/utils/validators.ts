export const validators = {
  razonSocial: (value: string) => {
    if (!value.trim()) return "La Razón Social es obligatoria";
    if (value.trim().length < 3) return "La Razón Social debe tener al menos 3 caracteres";
    return "";
  },

  nit: (value: string) => {
    if (!value.trim()) return "El NIT es obligatorio";
    if (!/^\d+$/.test(value)) return "El NIT solo debe contener números";
    if (value.length < 9) return "El NIT debe tener al menos 9 dígitos";
    if (value.length > 12) return "El NIT no puede tener más de 12 dígitos";
    return "";
  },

  email: (value: string) => {
    if (!value.trim()) return "El Email es obligatorio";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "El email no tiene un formato válido";
    return "";
  },

  representante: (value: string) => {
    if (!value.trim()) return "El Representante Legal es obligatorio";
    if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
    return "";
  },

  telefono: (value: string) => {
    if (value && !/^\d+$/.test(value)) return "El teléfono solo debe contener números";
    return "";
  }
};