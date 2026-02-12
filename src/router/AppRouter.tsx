import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Merchants from "../pages/Merchants";
import NewMerchant from "../pages/NewMerchant";
import EditMerchant from "../pages/EditMerchant";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/merchants" replace />} />
        <Route path="/merchants" element={<Merchants />} />
        <Route path="/merchants/new" element={<NewMerchant />} />
        <Route path="/merchants/edit/:id" element={<EditMerchant />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;