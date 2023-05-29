import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function Breadcrumb({ list }) {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: !isActive ? "#fd4d05" : "black",
      textDecoration: "none",
    };
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink to="/" style={navLinkStyles}>
            Home
          </NavLink>
        </li>
        {list
          ?.filter((item) => item.name !== undefined)
          .map((item, index) => (
            <li className="breadcrumb-item" key={++index}>
              <NavLink to={item?.url} style={navLinkStyles}>
                {" "}
                {item.name}
              </NavLink>
            </li>
          ))}
      </ol>
    </nav>
  );
}
