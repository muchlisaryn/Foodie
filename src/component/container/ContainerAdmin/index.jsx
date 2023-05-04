import Sidebar from "../../molecules/Sidebar";
import "./style.scss";

export default function ContainerAdmin({ children }) {
  return (
    <div className="bg-content">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}
