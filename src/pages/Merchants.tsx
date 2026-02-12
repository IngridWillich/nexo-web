'use client';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMerchants } from "../context/MerchantContext";
import StatusBadge from "../components/ui/StatusBadge";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import { Search, CheckCircle, Edit, Eye } from "lucide-react";

const Merchants = () => {
  const { merchants } = useMerchants();
  const location = useLocation();

  const [filtered, setFiltered] = useState(merchants);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.success);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.05) {
        setLoading(false);
      } else {
        setError("Error de conexión con el servidor");
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        window.history.replaceState({}, document.title);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    try {
      const result = merchants.filter(
        (m) =>
          m.razonSocial.toLowerCase().includes(search.toLowerCase()) ||
          m.nit.includes(search)
      );
      setFiltered(result);
    } catch (err) {
      setError("Error al filtrar los comercios");
    }
  }, [search, merchants]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Comercios
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Gestiona todos tus comercios registrados
            </p>
          </div>
          <Link
            to="/merchants/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            + Nuevo Comercio
          </Link>
        </div>

        {successMessage && (
          <div className="mb-4 animate-slideDown">
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700 flex-1">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por razón social o NIT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-md pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>
        {filtered.length === 0 ? (<EmptyState />) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "comercio encontrado" : "comercios encontrados"}
              </p>
              <p className="text-xs text-gray-400">
                Última actualización: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Razón Social
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        NIT
                      </th>
                      <th scope="col" className="hidden md:table-cell px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Email
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Estado
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filtered.map((merchant) => (
                      <tr 
                        key={merchant.id} 
                        className="hover:bg-gray-50 transition-colors group"
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center">
                            <Link 
                              to={`/merchants/edit/${merchant.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1 group/link"
                            >
                              {merchant.razonSocial}
                              <Edit className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity text-blue-600" />
                            </Link>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          {merchant.nit}
                        </td>
                        <td className="hidden md:table-cell whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          {merchant.email}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <StatusBadge status={merchant.estado} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/merchants/edit/${merchant.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Editar</span>
                            </Link>
                           
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>


    </div>
  );
};

export default Merchants;