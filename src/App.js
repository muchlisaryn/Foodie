import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddAlamat,
  AddUser,
  Alamat,
  Biodata,
  Cart,
  Category,
  Checkout,
  DetailProduct,
  Error,
  Home,
  Invoice,
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
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="invoice/:order_id" element={<Invoice />} />
          <Route path="user" element={<Biodata />} />
          <Route path="alamat/">
            <Route path="" element={<Alamat />} />
            <Route path="add-alamat" element={<AddAlamat />} />
          </Route>
          <Route path="pemesanan/">
            <Route path="" element={<Pemesanan />} />
          </Route>
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
