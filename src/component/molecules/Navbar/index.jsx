import { NavLink } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./styles.scss";
import { useState } from "react";

export default function Navbar() {
  const [btnLogout, setBtnLogout] = useState(false);

  const searchProduct = (e) => {
    e.preventDefault();
  };

  const clickBtnLogout = () => {
    if (btnLogout) {
      setBtnLogout(false);
    } else {
      setBtnLogout(true);
    }
  };
  const login = false;

  return (
    <nav class="navbar border-bottom fixed-top">
      <div class="container-fluid ">
        <div class="navbar-brand">
          <Logo />
        </div>
        <Input
          placeholder="Search From more than 10,000 products"
          type="search"
          onSubmit={searchProduct}
          className="search"
        />
        <div className="d-flex align-items-center">
          <NavLink>
            <div className="position-relative">
              <HiOutlineShoppingCart size={22} color="black" />
              <span className="position-absolute top-0 translate-middle mt-1 badge border border-light rounded-circle bg-danger">
                1
              </span>
            </div>
          </NavLink>
          <div className="border-start ps-2 ms-3">
            <div>
              <Button type="avatar" onClick={clickBtnLogout}>
                <div className="d-flex align-items-center avatar">
                  <img
                    src="https://akcdn.detik.net.id/visual/2022/12/14/kiri-avatar-the-way-of-water_169.png?w=650"
                    alt="avatar"
                  />
                  <div className="ms-2">Muchlis</div>
                </div>
              </Button>
              {btnLogout && (
                <div className="position-absolute mt-2 ">
                  <Button>Logout</Button>
                </div>
              )}
            </div>
            {/* <Button>Login</Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
