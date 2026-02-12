import type { MerchantStatus } from "../../types/Merchant";

interface Props {
  status: MerchantStatus;
}

const StatusBadge = ({ status }: Props) => {
  const getClasses = () => {
    switch (status) {
      case "ACTIVO":
        return "bg-green-100 text-green-800";
      case "INACTIVO":
        return "bg-red-100 text-red-800";
      case "PENDIENTE_VALIDACION":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "PENDIENTE_VALIDACION":
        return "Pendiente";
      default:
        return status.charAt(0) + status.slice(1).toLowerCase();
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClasses()}`}
    >
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
