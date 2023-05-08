import Navbar from "../../molecules/Navbar";
import "./style.scss";

export default function Container({
  children,
  onChange,
  onSubmit,
  value,
  setValue,
}) {
  return (
    <>
      <Navbar
        onChange={onChange}
        onSubmit={onSubmit}
        value={value}
        setValue={setValue}
      />
      <div className="container">{children}</div>
    </>
  );
}
