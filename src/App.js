import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddUser,
  Category,
  Home,
  KelolaPemesanan,
  KelolaUser,
  Tag,
} from "./pages";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/kelola-product" element={<KelolaUser />} />
        <Route path="/admin/kelola-user" element={<KelolaUser />} />
        <Route path="/admin/kelola-user/add-user" element={<AddUser />} />
        <Route path="/admin/kelola-pemesanan" element={<KelolaPemesanan />} />
        <Route path="/admin/configurasi/category" element={<Category />} />
        <Route path="/admin/configurasi/tag" element={<Tag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
