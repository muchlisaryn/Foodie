import { useNavigate } from "react-router-dom";
import { notFoundIlustration } from "../../assets";
import { Button } from "../../component";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div>
        <img src={notFoundIlustration} alt="ilustration" width={300} />
        <div className="text-center mt-3 mb-2">"SORRY, PAGE NOT FOUND"</div>
        <Button onClick={() => navigate("/")} type="button-primary">
          Return to the homepage
        </Button>
      </div>
    </div>
  );
}
