import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LogoSecondary, avatarDefault } from "../../../assets";
import { getOneUser } from "../../../features/UserSlice";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { BiLogIn, BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import { logout } from "../../../features/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCart } from "../../../features/CartSlice";

export default function Navbar({ onSubmit, value, setValue }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.users.user);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [query, setQuery] = useState("");
  const auth = localStorage.getItem("auth");
  const id = localStorage.getItem("user");

  const changeColorNavbar = () => {
    if (window.scrollY > 1) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  useEffect(() => {
    changeColorNavbar();
    window.addEventListener("scroll", changeColorNavbar);
  });

  //get user profile name by id & getCart
  useEffect(() => {
    dispatch(getOneUser({ id }));
    dispatch(getCart());
  }, [dispatch, id]);

  //show or off dropdowns
  const clickDropDowns = () => {
    if (showDropdowns) {
      setShowDropdowns(false);
    } else {
      setShowDropdowns(true);
    }
  };

  //action siginout
  const signOut = async () => {
    const logoutAction = await dispatch(logout(auth));
    const result = await unwrapResult(logoutAction);
    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result?.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: result.message,
      });
      navigate("/");
    }
  };

  //function search product
  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  if (location === "/") {
    return (
      <nav
        className={`${
          colorChange && `border-bottom bg-light`
        } fixed-top navbar`}
      >
        <div className="container-fluid mx-0 mx-md-3">
          <div className="navbar-brand">
            {colorChange ? (
              <Logo />
            ) : (
              <img src={LogoSecondary} alt="logo secondary" />
            )}
          </div>
          {colorChange ? (
            <Input
              placeholder="Search...."
              type="search"
              onSubmit={onSubmit ? onSubmit : onSearch}
              onChange={(e) =>
                setValue ? setValue(e.target.value) : setQuery(e.target.value)
              }
              value={value ? value : query}
              className="search"
            />
          ) : (
            <form onSubmit={onSearch} className="search">
              <div className="position relative nonActive">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control ps-5 "
                />
                <div className="icon-search position-absolute top-50 p-3 d-flex align-items-center translate-middle-y">
                  <BiSearch size={22} className="icon-search" color="white" />
                </div>
              </div>
            </form>
          )}
          <div className="d-flex align-items-center ">
            {auth ? (
              <>
                <NavLink to="/cart">
                  <div className="position-relative">
                    <HiOutlineShoppingCart
                      size={22}
                      color={colorChange ? "black" : "white"}
                    />
                    <span className="position-absolute top-0 translate-middle mt-1 badge rounded-circle bg-danger pb-1">
                      {cart?.length}
                    </span>
                  </div>
                </NavLink>
                <div className="mx-2"></div>
                <div className="avatar" onClick={clickDropDowns}>
                  <div className="position-relative">
                    <div className="d-flex align-items-center border-start ps-2 ">
                      <img src={avatarDefault} alt="avatar" />
                      <div className="ms-2">{user?.first_name}</div>
                    </div>
                    {showDropdowns && (
                      <div className="position-absolute mt-2 ms-1">
                        <div className="Dropdowns rounded border">
                          <div
                            className="d-flex align-items-center dropdowns-item  border-bottom p-2 px-3"
                            onClick={() => navigate(`/user?id=${id}`)}
                          >
                            <AiFillSetting />
                            <span className="ms-1">Settings</span>
                          </div>
                          <div
                            className="d-flex align-items-center dropdowns-item p-2 px-3"
                            onClick={signOut}
                          >
                            <IoLogOut />
                            <span className="ms-1">Logout</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Button type="button-primary" onClick={() => navigate("/login")}>
                <div className="d-flex align-items-center">
                  <BiLogIn />
                  <div className="ms-2">Login</div>
                </div>
              </Button>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-bottom bg-light fixed-top navbar">
      <div className="container-fluid mx-0 mx-md-3">
        <div className="navbar-brand">
          <Logo />
        </div>
        <Input
          placeholder="Search...."
          type="search"
          onSubmit={onSubmit ? onSubmit : onSearch}
          onChange={(e) =>
            setValue ? setValue(e.target.value) : setQuery(e.target.value)
          }
          value={value ? value : query}
          className="search"
        />
        <div className="d-flex align-items-center ">
          {auth ? (
            <>
              <NavLink to="/cart">
                <div className="position-relative">
                  <HiOutlineShoppingCart size={22} color="black" />
                  <span className="position-absolute top-0 translate-middle mt-1 badge border border-light rounded-circle bg-danger pb-1">
                    {cart?.length}
                  </span>
                </div>
              </NavLink>
              <div className="mx-2"></div>
              <div className="avatar" onClick={clickDropDowns}>
                <div className="position-relative">
                  <div className="d-flex align-items-center border-start ps-2 ">
                    <img src={avatarDefault} alt="avatar" />
                    <div className="ms-2">{user?.first_name}</div>
                  </div>
                  {showDropdowns && (
                    <div className="position-absolute mt-2 ms-1">
                      <div className="Dropdowns rounded border">
                        <div
                          className="d-flex align-items-center dropdowns-item  border-bottom p-2 px-3"
                          onClick={() => navigate(`/user?id=${id}`)}
                        >
                          <AiFillSetting />
                          <span className="ms-1">Settings</span>
                        </div>
                        <div
                          className="d-flex align-items-center dropdowns-item p-2 px-3"
                          onClick={signOut}
                        >
                          <IoLogOut />
                          <span className="ms-1">Logout</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Button type="button-primary" onClick={() => navigate("/login")}>
              <div className="d-flex align-items-center">
                <BiLogIn />
                <div className="ms-2">Login</div>
              </div>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
