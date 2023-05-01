import { BiSearch } from "react-icons/bi";

export default function Input({ type, placeholder, className, onSubmit }) {
  if (type === "search") {
    return (
      <form className={className} onSubmit={onSubmit}>
        <div className="position relative">
          <input
            type={type}
            placeholder={placeholder}
            className={`form-control ps-5`}
          />
          <div className="icon-search position-absolute top-50 p-3 d-flex align-items-center translate-middle-y">
            <BiSearch size={22} className="icon-search" />
          </div>
        </div>
      </form>
    );
  }

  return (
    <form style={{ width: "554px" }}>
      <input
        type={type}
        placeholder={placeholder}
        className={`form-control ${className}`}
      />
    </form>
  );
}
