import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { avatarDefault } from "../../../assets";
import { getOneUser } from "../../../features/UserSlice";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import Swal from "sweetalert2";
import { logout } from "../../../features/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Footer from "../Footer";
import { getCart } from "../../../features/CartSlice";

export default function Navbar({ onSubmit, value, setValue }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.users.user);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [query, setQuery] = useState("");
  const auth = localStorage.getItem("auth");
  const id = localStorage.getItem("user");

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

  return (
    <>
      <nav className="navbar  border-bottom fixed-top">
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
      {/* <div className="content-pages">{children}</div>
      <Footer /> */}
    </>
  );
}
