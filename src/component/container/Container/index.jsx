import Navbar from "../../molecules/Navbar";
import "./style.scss";

export default function Container({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
}
