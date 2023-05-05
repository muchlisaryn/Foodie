import { BiSearch } from "react-icons/bi";

export default function Input({
  type,
  placeholder,
  className,
  onSubmit,
  onChage,
  value,
  rows,
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

  if (type === "textarea") {
    return (
      <form className="w-100" onSubmit={onSubmit}>
        <textarea
          className={`form-control ${className}`}
          rows={rows}
          onChange={onChage}
          value={value}
        />
      </form>
    );
  }

  if (type === "file") {
    return (
      <form className="w-100" onSubmit={onSubmit}>
        <input
          type="file"
          className={`form-control ${className}`}
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
        />
      </form>
    );
  }

  return (
    <form className="w-100" onSubmit={onSubmit}>
      <input
        type={type}
        placeholder={placeholder}
        className={`form-control  ${className}`}
        onChange={onChage}
        value={value}
      />
    </form>
  );
}
