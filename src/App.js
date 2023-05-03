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

        <Route path="/admin/">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelola-product" element={<KelolaUser />} />
          <Route path="kelola-user" element={<KelolaUser />} />
          <Route path="kelola-user/add-user" element={<AddUser />} />
          <Route path="kelola-pemesanan" element={<KelolaPemesanan />} />
          <Route path="configurasi/">
            <Route path="category" element={<Category />} />
            <Route path="tag" element={<Tag />} />
          </Route>
        </Route>
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
