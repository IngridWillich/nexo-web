import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ 
  message = "Ocurrió un error al cargar los comercios", 
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Error de conexión
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-all shadow-sm hover:shadow-md">
          <RefreshCw className="w-4 h-4" />
          Intentar nuevamente
        </button>
      )}
    </div>
  );
};

export default ErrorState;