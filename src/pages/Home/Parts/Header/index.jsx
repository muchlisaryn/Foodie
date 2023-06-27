import { Button } from "../../../../component";
import { ilustrationHeader } from "../../../../assets";
import "./style.scss";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Header() {
  return (
    <div className="header align-items-center ">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-md-start vh-100 ">
          <div className="col ">
            <div className="title  fw-bold">
              We're <span>Serious </span>For <span>Food</span> &{" "}
              <span>Delivery</span>.
            </div>
            <p className="my-4 text-light">
              Best cooks and best delivery guys all at your service. Hot tasty
              food will reach you in 60 minutes.
            </p>

            <Button type="button-secondary" className="w-50 w-md-25">
              <div className="d-flex align-items-center justify-content-center p-2">
                <div className="me-3">Get Started</div>
                <AiOutlineArrowRight />
              </div>
            </Button>
          </div>
          <div className="col d-none d-md-block image d-flex justify-content-center">
            <img src={ilustrationHeader} alt="ilustration header" />
          </div>
        </div>
      </div>
    </div>
  );
}
