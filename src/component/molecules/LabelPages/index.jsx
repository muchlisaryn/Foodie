import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { IoIosArrowBack } from "react-icons/io";

export default function LabelPages({ type, label, children, to }) {
  const navigate = useNavigate();

  if (type === "back") {
    return (
      <div className="d-flex align-items-center mb-3">
        <div>
          <Button
            type="button-primary"
            className="d-flex align-items-center"
            onClick={() => navigate(to)}
          >
            <IoIosArrowBack /> <span className="ms-1"> Back</span>
          </Button>
        </div>
        <div className="fw-bold ms-3">{label}</div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="fw-bold">{label}</div>
      {children ? children : <></>}
    </div>
  );
}
