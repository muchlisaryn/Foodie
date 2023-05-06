import { AiOutlinePlus } from "react-icons/ai";
import "./styles.scss";

export default function Button({
  type,
  children,
  onClick,
  className,
  disabled,
}) {
  if (type === "custom") {
    return (
      <button className={`btn-custom ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }

  if (type === "button-primary") {
    return (
      <button
        onClick={onClick}
        className={`btn btn-orange ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (type === "btn-add") {
    return (
      <button
        onClick={onClick}
        className={`btn bg-success text-light ${className}`}
      >
        <div className="d-flex align-items-center">
          <AiOutlinePlus />
          <div className="ms-2">{children}</div>
        </div>
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}
