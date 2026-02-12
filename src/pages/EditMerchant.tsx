import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMerchants } from "../context/MerchantContext";
import MerchantForm from "../components/forms/MerchantForm";
import BackButton from "../components/ui/BackButton";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import type { Merchant, MerchantStatus } from "../types/Merchant";

const EditMerchant = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMerchant, updateMerchant } = useMerchants();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getMerchant(parseInt(id, 10));
      if (found) {
        setMerchant(found);
      } else {
        navigate("/merchants", { 
          state: { error: "El comercio no existe" },
          replace: true 
        });
      }
    }
  }, [id, getMerchant, navigate]);

  const handleSubmit = (
    formData: Omit<Merchant, "id" | "estado">,
    newStatus?: MerchantStatus
  ) => {
    if (!merchant) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedMerchant: Merchant = {
        ...formData,
        id: merchant.id,
        estado: newStatus || merchant.estado, 
      };
      
      updateMerchant(merchant.id, updatedMerchant);
      setIsSubmitting(false);
      
      navigate("/merchants", {
        state: { 
          success: `✅ Comercio "${formData.razonSocial}" actualizado correctamente` 
        },
        replace: true,
      });
    }, 500);
  };

  if (!merchant) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <BackButton />
        <Card className="mt-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <span className="text-gray-500 text-xl">?</span>
          </div>
          <h2 className="text-lg font-medium text-gray-900">Cargando comercio...</h2>
          <p className="text-sm text-gray-500 mt-1">Por favor espera</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Editar Comercio
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Actualiza la información del comercio
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Estado actual:</span>
          <StatusBadge status={merchant.estado} />
        </div>

        <Card>
          <MerchantForm 
            initialData={{
              razonSocial: merchant.razonSocial,
              nit: merchant.nit,
              email: merchant.email,
              telefono: merchant.telefono || "",
              representante: merchant.representante,
            }}
            initialStatus={merchant.estado} 
            onSubmit={handleSubmit}
            isEditing={true}
            isSubmitting={isSubmitting}
          />
        </Card>
      </div>
    </div>
  );
};

export default EditMerchant;