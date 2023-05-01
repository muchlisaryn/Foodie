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
import Button from "../../atoms/Button";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [showConfig, setConfig] = useState(false);

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
              <NavLink className="menu-item p-1 my-2 d-flex align-items-center">
                <BsArchive />
                <div className="ms-2">Kelola Product</div>
              </NavLink>
              <NavLink className="menu-item p-1 my-2 d-flex align-items-center">
                <IoClipboardOutline />
                <div className="ms-2">Kelola Pemesanan</div>
              </NavLink>
              <NavLink
                className={`menu-item p-1 my-2 d-flex align-items-center ${
                  showConfig ? "btn-active text-light" : ""
                }`}
                onClick={clickConfig}
              >
                <IoSettingsOutline />
                <div className="mx-2">Configuration</div>
                {showConfig ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </NavLink>
              {showConfig && (
                <>
                  <NavLink
                    className="menu-item p-1 mx-4 d-flex align-items-center"
                    style={itemMenuActive}
                    to="/admin/configurasi/category"
                  >
                    <div>Category</div>
                  </NavLink>
                  <NavLink
                    className="menu-item p-1 mx-4 d-flex align-items-center"
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
