import { NavLink } from "react-router-dom";
import Container from "../Container";
import "./style.scss";

export default function ContainerUser({ children }) {
  const token = localStorage.getItem("auth");

  const styleNavActive = ({ isActive }) => {
    return {
      color: isActive ? "#fd4d05" : "black",
    };
  };

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="side-nav me-3 border rounded ">
          <div className="border-bottom p-2">Nama</div>
          <div className="d-flex justify-content-center">
            <div>
              <NavLink
                to="/user/biodata"
                style={styleNavActive}
                className="menu-item"
              >
                <div className=" rounded p-2">Biodata Diri</div>
              </NavLink>
              <NavLink
                to="/user/alamat"
                style={styleNavActive}
                className="menu-item"
              >
                <div className=" rounded p-2">Alamat</div>
              </NavLink>
              <NavLink
                to="/user/pemesanan"
                style={styleNavActive}
                className="menu-item"
              >
                <div className=" rounded p-2">Pemesanan</div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-75 border rounded p-2">{children}</div>
      </div>
    </Container>
  );
}
