import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../features/CartSlice";
import { avatarDefault } from "../../../assets";

export default function Navbar({
  onChange,
  onSubmit,
  value,
  setValue,
  children,
}) {
  const cart = useSelector((state) => state.cart.cart);
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();

  return (
    <>
      <nav class="navbar border-bottom fixed-top">
        <div class="container-fluid ">
          <div class="navbar-brand">
            <Logo />
          </div>
          <Input
            placeholder="Search From more than 10,000 products"
            type="search"
            onSubmit={onSubmit}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="search"
          />
          <div className="d-flex align-items-center ">
            {auth ? (
              <>
                {" "}
                <NavLink to="/cart">
                  <div className="position-relative">
                    <HiOutlineShoppingCart size={22} color="black" />
                    <span className="position-absolute top-0 translate-middle mt-1 badge border border-light rounded-circle bg-danger pb-1">
                      {cart?.length}
                    </span>
                  </div>
                </NavLink>
                <div className="mx-2"></div>
                <NavLink to="/user/biodata" className="avatar ">
                  <div className="d-flex align-items-center border-start ps-2 ">
                    <img src={avatarDefault} alt="avatar" />
                    <div className="ms-2">Muchlis</div>
                  </div>
                </NavLink>
              </>
            ) : (
              <Button type="button-primary" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </>
  );
}
