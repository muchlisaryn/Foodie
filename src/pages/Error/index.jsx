import { useLocation, useNavigate } from "react-router-dom";
import { notFoundIlustration } from "../../assets";
import { Button } from "../../component";

export default function Error() {
  const location = useLocation();
  const error = location.state;

  const navigate = useNavigate();
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div>
        <div className="d-flex justify-content-center">
          <img src={notFoundIlustration} alt="ilustration" width={300} />
        </div>
        <div className="text-center my-3 fw-bold">
          {error?.error ? error.error.toUpperCase() : "SORRY, PAGE NOT FOUND"}
        </div>
        <div className="mb-3">{error?.message && error.message}</div>
        <Button onClick={() => navigate("/")} type="button-primary">
          Return to the homepage
        </Button>
      </div>
    </div>
  );
}
