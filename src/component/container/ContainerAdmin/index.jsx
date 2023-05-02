import Sidebar from "../../molecules/Sidebar";
import "./style.scss";

export default function ContainerAdmin({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="content ">{children}</div>
    </div>
  );
}
