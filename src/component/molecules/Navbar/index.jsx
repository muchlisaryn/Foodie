import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "./styles.scss";
import { useSelector } from "react-redux";

export default function Navbar({
  onChange,
  onSubmit,
  value,
  setValue,
  children,
}) {
  const cart = useSelector((state) => state.cart.cart);
  const login = localStorage.getItem("auth");
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
            {login ? (
              <>
                {" "}
                <NavLink to="/cart">
                  <div className="position-relative ">
                    <HiOutlineShoppingCart size={22} color="black" />
                    <span className="position-absolute top-0 translate-middle mt-1 badge border border-light rounded-circle bg-danger pb-1">
                      {cart?.length}
                    </span>
                  </div>
                </NavLink>
                <Button type="avatar" onClick={() => navigate("/user/biodata")}>
                  <div className="d-flex align-items-center avatar">
                    <img
                      src="https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/01/12/1119792131.jpg"
                      alt="avatar"
                    />
                    <div className="ms-2">Muchlis</div>
                  </div>
                </Button>
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
