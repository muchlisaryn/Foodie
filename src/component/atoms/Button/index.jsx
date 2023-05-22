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
      <button
        className={`btn-custom ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (type === "button-primary") {
    return (
      <button
        onClick={onClick}
        className={`btn btn-orange   ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (type === "button-secondary") {
    return (
      <button
        onClick={onClick}
        className={`btn btn-secondary  ${className}`}
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
        className={`btn bg-success text-light w-100 ${className}`}
        disabled={disabled}
      >
        <div className="d-flex justify-content-center align-items-center">
          <AiOutlinePlus />
          <div className="ms-2">{children}</div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
