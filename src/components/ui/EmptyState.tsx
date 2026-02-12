import { Link } from "react-router-dom";
import { Building2, Plus } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6">
        <Building2 className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No hay comercios registrados
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Comienza agregando tu primer comercio al sistema. Una vez creado, aparecerá aquí.
      </p>
      <Link
        to="/merchants/new"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
      >
        <Plus className="w-4 h-4" />
        Crear primer comercio
      </Link>
    </div>
  );
};

export default EmptyState;