import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Merchant } from "../types/Merchant";
import { merchantsMock } from "../data/merchants";

interface MerchantContextType {
  merchants: Merchant[];
  addMerchant: (merchant: Merchant) => void;
  updateMerchant: (id: number, merchant: Merchant) => void; 
  deleteMerchant: (id: number) => void; 
  getMerchant: (id: number) => Merchant | undefined;  
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider = ({ children }: { children: ReactNode }) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("merchants");
    if (stored) {
      setMerchants(JSON.parse(stored));
    } else {
      setMerchants(merchantsMock);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("merchants", JSON.stringify(merchants));
    }
  }, [merchants, isInitialized]);

  const addMerchant = (merchant: Merchant) => {
    setMerchants((prev) => [...prev, merchant]);
  };

  const updateMerchant = (id: number, updatedMerchant: Merchant) => {
    setMerchants((prev) =>
      prev.map((m) => (m.id === id ? updatedMerchant : m))
    );
  };

  const deleteMerchant = (id: number) => {
    setMerchants((prev) => prev.filter((m) => m.id !== id));
  };

  const getMerchant = (id: number) => {
    return merchants.find((m) => m.id === id);
  };

  return (
    <MerchantContext.Provider
      value={{
        merchants,
        addMerchant,
        updateMerchant,
        deleteMerchant,
        getMerchant,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchants = () => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error("useMerchants must be used within a MerchantProvider");
  }
  return context;
};