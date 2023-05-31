import { useLocation } from "react-router-dom";
import Footer from "../../molecules/Footer";
import Navbar from "../../molecules/Navbar";
import "./style.scss";

export default function Container({ children, setValue, value, onSubmit }) {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar setValue={setValue} value={value} onSubmit={onSubmit} />
      <div className="main container">{children}</div>
      {location.pathname !== "/cart" && <Footer />}
    </div>
  );
}
