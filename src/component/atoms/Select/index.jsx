export default function Select({
  type,
  data,
  onChange,
  className,
  value,
  defaultValue,
  disabled,
  id,
}) {
  if (type === "select id") {
    return (
      <select
        aria-label="Default select example"
        onChange={onChange}
        className={`form-select form-select-sm w-100 ${className}`}
        value={value}
        defaultValue={"DEFAULT"}
        disabled={disabled}
        id={id}
      >
        <option value="DEFAULT" disabled>
          {defaultValue}
        </option>
        {data?.map((item) => (
          <option key={item?.id} id={item?.id} value={item?.id}>
            {item.nama}
          </option>
        ))}
      </select>
    );
  }

  return (
    <select
      aria-label="Default select example"
      onChange={onChange}
      className={`form-select w-100 ${className}`}
      value={value}
      defaultValue={"DEFAULT"}
    >
      <option value="DEFAULT" disabled>
        {defaultValue}
      </option>
      {data?.map((item) => (
        <option value={item.name}>{item.name}</option>
      ))}
    </select>
  );
}
