'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMerchants } from "../context/MerchantContext";
import MerchantForm from "../components/forms/MerchantForm";
import BackButton from "../components/ui/BackButton";
import type { Merchant } from "../types/Merchant";

const NewMerchant = () => {
  const navigate = useNavigate();
  const { addMerchant } = useMerchants();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: Omit<Merchant, "id" | "estado">) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newMerchant: Merchant = {
        id: Date.now(),
        ...formData,
        telefono: formData.telefono || "", 
        estado: "PENDIENTE_VALIDACION",
      };

      addMerchant(newMerchant);
      setIsSubmitting(false);
      
      navigate("/merchants", {
        state: { 
          success: `✅ Comercio "${formData.razonSocial}" creado correctamente` 
        },
        replace: true,
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Crear Comercio
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Completa todos los campos obligatorios (*)
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <MerchantForm 
            onSubmit={handleSubmit}
            isEditing={false}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default NewMerchant;