import { BiSearch } from "react-icons/bi";

export default function Input({
  type,
  placeholder,
  className,
  onSubmit,
  onChage,
  value,
}) {
  if (type === "search") {
    return (
      <form className={className} onSubmit={onSubmit}>
        <div className="position relative">
          <input
            type={type}
            placeholder={placeholder}
            className={`form-control ps-5`}
            onChange={onChage}
            value={value}
          />
          <div className="icon-search position-absolute top-50 p-3 d-flex align-items-center translate-middle-y">
            <BiSearch size={22} className="icon-search" />
          </div>
        </div>
      </form>
    );
  }

  return (
    <form>
      <input
        type={type}
        placeholder={placeholder}
        className={`default-form form-control ${className}`}
        onChange={onChage}
        value={value}
      />
    </form>
  );
}
