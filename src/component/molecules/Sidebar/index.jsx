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
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export default function Sidebar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfig, setConfig] = useState(true);

  //open dropdowns configuration menu
  const clickConfig = () => {
    if (showConfig) {
      setConfig(false);
    } else {
      setConfig(true);
    }
  };

  //signOut
  const signOut = async () => {
    const actionSignOut = await dispatch(logout());
    const result = await unwrapResult(actionSignOut);
    if (result) {
      navigate("/login");
      Swal.fire("Success!", `${result.message}`, "success");
    }
  };

  //styling menu active
  const menuActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#fd4d05" : "",
      color: isActive ? "white" : "",
    };
  };

  //styling item-menu active
  const itemMenuActive = ({ isActive }) => {
    return {
      fontWeight: isActive ? "Bold" : "",
      color: isActive ? "#fd4d05" : "",
    };
  };

  return (
    <div>
      <div>
        <nav className="navbar border-bottom fixed-top">
          <div className="container-fluid mx-3">
            <div className="navbar-brand">
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
                <NavLink
                  className="menu-item p-1 d-flex align-items-center"
                  onClick={signOut}
                >
                  <IoLogOutOutline />
                  <div className="ms-2">Logout</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
