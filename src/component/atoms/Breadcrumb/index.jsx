import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function Breadcrumb({ list }) {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#fd4d05" : "black",
      textDecoration: "none",
    };
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {list?.map((item, index) => (
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
