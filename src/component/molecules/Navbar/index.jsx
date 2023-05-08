import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "./styles.scss";

export default function Navbar({ onChange, onSubmit, value, setValue }) {
  const navigate = useNavigate();

  const login = true;

  return (
    <nav class="navbar border-bottom fixed-top">
      <div class="container-fluid ">
        <div class="navbar-brand">
          <Logo />
        </div>
        <Input
          placeholder="Search From more than 10,000 products"
          type="search"
          onSubmit={onSubmit}
          onChage={(e) => setValue(e.target.value)}
          className="search"
        />
        <div className="d-flex align-items-center ">
          <NavLink>
            <div className="position-relative">
              <HiOutlineShoppingCart size={22} color="black" />
              <span className="position-absolute top-0 translate-middle mt-1 badge border border-light rounded-circle bg-danger">
                1
              </span>
            </div>
          </NavLink>
          <div className="mt-2 border-start ms-3 ps-1">
            {login ? (
              <Button type="avatar" onClick={() => navigate("/user/biodata")}>
                <div className="d-flex align-items-center avatar">
                  <img
                    src="https://akcdn.detik.net.id/visual/2022/12/14/kiri-avatar-the-way-of-water_169.png?w=650"
                    alt="avatar"
                  />
                  <div className="ms-2">Muchlis</div>
                </div>
              </Button>
            ) : (
              <Button>Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
