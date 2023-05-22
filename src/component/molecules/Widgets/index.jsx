import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function Widgets({ children }) {
  const styleNavActive = ({ isActive }) => {
    return {
      color: isActive ? "#fd4d05" : "black",
      borderBottomStyle: isActive ? "solid" : "",
    };
  };

  return (
    <div>
      <div className="d-flex border-bottom mb-2">
        <NavLink
          to="/user/biodata"
          style={styleNavActive}
          className=" menu-item"
        >
          <div className="pb-2 ">Biodata Diri</div>
        </NavLink>
        <NavLink
          to="/user/alamat"
          style={styleNavActive}
          className=" menu-item mx-3"
        >
          <div className="pb-2 ">Alamat</div>
        </NavLink>
        <NavLink
          to="/user/pemesanan"
          style={styleNavActive}
          className=" menu-item pb-2 "
        >
          <div>Pemesanan</div>
        </NavLink>
      </div>
      <div>{children}</div>
    </div>
  );
}
