import { LogoFoodie } from "../../../assets";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/">
      <img src={LogoFoodie} className="w-100" />
    </NavLink>
  );
}
