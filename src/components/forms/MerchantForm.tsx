import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { validators } from "../../utils/validators";
import Input from "../ui/Input";
import type { Merchant, MerchantStatus } from "../../types/Merchant";

interface FormErrors {
  razonSocial?: string;
  nit?: string;
  email?: string;
  representante?: string;
  telefono?: string;
}

interface MerchantFormProps {
  initialData?: Omit<Merchant, "id" | "estado">;
  initialStatus?: MerchantStatus; 
  onSubmit: (data: Omit<Merchant, "id" | "estado">, status?: MerchantStatus) => void; 
  isEditing?: boolean;
  isSubmitting?: boolean;
}

const MerchantForm = ({ 
  initialData = {
    razonSocial: "",
    nit: "",
    email: "",
    telefono: "",
    representante: "",
  },
  initialStatus = "PENDIENTE_VALIDACION", 
  onSubmit, 
  isEditing = false,
  isSubmitting: externalIsSubmitting = false
}: MerchantFormProps) => {
  const [form, setForm] = useState(initialData);
  const [status, setStatus] = useState<MerchantStatus>(initialStatus); 
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

  const isSubmitting = externalIsSubmitting || internalIsSubmitting;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "razonSocial": return validators.razonSocial(value);
      case "nit": return validators.nit(value);
      case "email": return validators.email(value);
      case "representante": return validators.representante(value);
      case "telefono": return value ? validators.telefono(value) : "";
      default: return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      razonSocial: validators.razonSocial(form.razonSocial),
      nit: validators.nit(form.nit),
      email: validators.email(form.email),
      representante: validators.representante(form.representante),
    };

    if (form.telefono) {
      newErrors.telefono = validators.telefono(form.telefono);
    }

    setErrors(newErrors);
    
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    return !Object.values(newErrors).some(error => error && error.length > 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.text-red-600');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setInternalIsSubmitting(true);
    
    setTimeout(() => {
      if (isEditing) {
        onSubmit(form, status);
      } else {
        onSubmit(form);
      }
      setInternalIsSubmitting(false);
    }, 500);
  };

  const getSelectClassName = () => {
    return `w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        name="razonSocial"
        label="Razón Social"
        value={form.razonSocial}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ej: Tech Solutions SAS"
        error={errors.razonSocial}
        touched={touched.razonSocial}
        required
        disabled={isSubmitting}
      />

      <Input
        name="nit"
        label="NIT"
        value={form.nit}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ej: 123456789 (9-12 dígitos)"
        error={errors.nit}
        touched={touched.nit}
        required
        disabled={isSubmitting}
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="ejemplo@correo.com"
        error={errors.email}
        touched={touched.email}
        required
        disabled={isSubmitting}
      />

      <Input
        name="telefono"
        label="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ej: 3001234567"
        error={errors.telefono}
        touched={touched.telefono}
        optional
        disabled={isSubmitting}
      />

      <Input
        name="representante"
        label="Representante Legal"
        value={form.representante}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Nombre completo del representante"
        error={errors.representante}
        touched={touched.representante}
        required
        disabled={isSubmitting}
      />

      {isEditing && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as MerchantStatus)}
            className={getSelectClassName()}
            disabled={isSubmitting}
          >
            <option value="PENDIENTE_VALIDACION">🟡 Pendiente de Validación</option>
            <option value="ACTIVO">🟢 Activo</option>
            <option value="INACTIVO">🔴 Inactivo</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Cambia el estado del comercio según corresponda
          </p>
        </div>
      )}
      {!isEditing && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            El comercio se creará con estado "Pendiente de Validación"
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {isEditing ? 'Actualizando...' : 'Guardando...'}
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            {isEditing ? 'Actualizar Comercio' : 'Guardar Comercio'}
          </>
        )}
      </button>
    </form>
  );
};

export default MerchantForm;