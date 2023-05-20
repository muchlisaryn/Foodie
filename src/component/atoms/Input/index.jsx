import { BiSearch } from "react-icons/bi";
import "./styles.scss";

export default function Input({
  type,
  placeholder,
  className,
  onSubmit,
  onChange,
  value,
  rows,
  onInput,
  accept,
  name,
  style,
  label,
  checked,
  id,
}) {
  if (type === "number") {
    return (
      <form className="w-100 number" onSubmit={onSubmit}>
        <input
          type="number"
          placeholder={placeholder}
          className={`form-control   ${className}`}
          onChange={onChange}
          value={value}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          min="0"
          style={style}
        />
      </form>
    );
  }

  if (type === "search") {
    return (
      <form className={className} onSubmit={onSubmit}>
        <div className="position relative">
          <input
            type={type}
            placeholder={placeholder}
            className={`form-control ps-5`}
            onChange={onChange}
            value={value}
            name={name}
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
          onChange={onChange}
          value={value}
        />
      </form>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={value}
          onChange={onChange}
          id="flexCheckDefault"
        />
        <label className="form-check-label" for="flexCheckDefault">
          {label}
        </label>
      </div>
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
          accept={accept}
          onChange={onChange}
        />
      </form>
    );
  }

  if (type === "radio") {
    return (
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <form className="w-100" onSubmit={onSubmit}>
      <input
        type={type}
        placeholder={placeholder}
        className={`form-control  ${className}`}
        onChange={onChange}
        value={value}
        onInput={onInput}
      />
    </form>
  );
}
