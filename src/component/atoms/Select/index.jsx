export default function Select({ type, data, onChange, className, value }) {
  if (type === "select id") {
    return (
      <select
        aria-label="Default select example"
        onChange={onChange}
        className={`form-select w-100 ${className}`}
        value={value}
      >
        {data?.map((item) => (
          <option value={item._id}>{item.name}</option>
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
    >
      {data?.map((item) => (
        <option value={item.name}>{item.name}</option>
      ))}
    </select>
  );
}
