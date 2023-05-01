import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Home, Tag } from "./pages";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/configurasi/category" element={<Category />} />
        <Route path="/admin/configurasi/tag" element={<Tag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
