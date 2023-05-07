import Navbar from "../../molecules/Navbar";
import "./style.scss";

export default function Container({ children, onChange, onSubmit }) {
  return (
    <>
      <Navbar onChange={onChange} onSubmit={onSubmit} />
      <div className="container">{children}</div>
    </>
  );
}
