import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddUser,
  Alamat,
  Biodata,
  Category,
  DetailProduct,
  Error,
  Home,
  KelolaPemesanan,
  KelolaProduct,
  KelolaUser,
  Login,
  Pemesanan,
  Register,
  SearchResult,
  Tag,
} from "./pages";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/KelolaProduct/AddProduct";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />

        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="product/:id" element={<DetailProduct />} />
        </Route>

        <Route path="/user/">
          <Route path="biodata" element={<Biodata />} />
          <Route path="alamat" element={<Alamat />} />
          <Route path="pemesanan" element={<Pemesanan />} />
        </Route>

        <Route path="/admin/">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelola-product/">
            <Route path="" element={<KelolaProduct />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
          <Route path="kelola-user" element={<KelolaUser />} />
          <Route path="kelola-user/">
            <Route path="" element={<KelolaUser />} />
            <Route path="add-user" element={<AddUser />} />
          </Route>
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
