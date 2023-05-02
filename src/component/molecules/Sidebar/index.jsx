import { useState } from "react";
import Logo from "../../atoms/Logo";
import "./style.scss";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  IoLogOutOutline,
  IoSettingsOutline,
  IoClipboardOutline,
} from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [showConfig, setConfig] = useState(true);

  const clickConfig = () => {
    if (showConfig) {
      setConfig(false);
    } else {
      setConfig(true);
    }
  };

  const menuActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#fd4d05" : "",
      color: isActive ? "white" : "",
    };
  };

  const itemMenuActive = ({ isActive }) => {
    return {
      fontWeight: isActive ? "Bold" : "",
      color: isActive ? "#fd4d05" : "",
    };
  };

  return (
    <div>
      <nav class="navbar border-bottom fixed-top">
        <div class="container-fluid mx-3">
          <div class="navbar-brand">
            <Logo />
          </div>
          <div>Hi! Admin Foodie</div>
        </div>
      </nav>
      <div className="sidebar border-end">
        <div className="mx-4 ">
          <div className="mt-5">
            <div>
              <NavLink
                className="menu-item p-1 my-2 d-flex align-items-center"
                style={menuActive}
                to="/admin/dashboard"
              >
                <AiOutlineDashboard />
                <div className="ms-2">Dashboard</div>
              </NavLink>
              <NavLink
                className="menu-item p-1 my-2 d-flex align-items-center"
                style={menuActive}
                to="/admin/kelola-product"
              >
                <BsArchive />
                <div className="ms-2">Kelola Product</div>
              </NavLink>
              <NavLink
                className="menu-item p-1 my-2 d-flex align-items-center"
                style={menuActive}
                to="/admin/kelola-pemesanan"
              >
                <IoClipboardOutline />
                <div className="ms-2">Kelola Pemesanan</div>
              </NavLink>
              <NavLink
                className="menu-item p-1 my-2 d-flex align-items-center"
                to="/admin/kelola-user"
                style={menuActive}
              >
                <RiUserSettingsLine />
                <div className="ms-2">Kelola User</div>
              </NavLink>
              <NavLink
                className={`menu-item p-1 my-2 d-flex align-items-center`}
                onClick={clickConfig}
              >
                <IoSettingsOutline />
                <div className="mx-2">Configuration</div>
                {showConfig ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </NavLink>
              {showConfig && (
                <>
                  <NavLink
                    className="list-item p-1 mx-4 d-flex align-items-center"
                    style={itemMenuActive}
                    to="/admin/configurasi/category"
                  >
                    <div>Category</div>
                  </NavLink>
                  <NavLink
                    className="list-item p-1 mx-4 d-flex align-items-center"
                    style={itemMenuActive}
                    to="/admin/configurasi/tag"
                  >
                    <div>Tag</div>
                  </NavLink>
                </>
              )}
              <NavLink className="menu-item p-1 d-flex align-items-center">
                <IoLogOutOutline />
                <div className="ms-2">Logout</div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
