import { appStore, googlePlay, image3 } from "../../../../assets";
import "./style.scss";

export default function OrderByMobileApp() {
  return (
    <div className="order-by-app d-flex flex-column flex-md-row flex-column-reverse align-items-center">
      <div className=" items px-2 text-center text-md-start px-md-5 mb-md-0 my-5 ">
        <div className="fw-bold h1 ">
          It's Now <span className="text-orange">More Easy</span> to Order by
          Our Mobile <span className="text-orange">App</span>
        </div>
        <p className="mt-4 ">
          All you need to do is download one of the best delivery apps, make a
          and most companies are opting for mobile app development for food
          delivery
        </p>
        <div className="d-flex justify-content-md-start justify-content-center">
          <div>
            <img src={googlePlay} alt="google play" />
          </div>
          <div className="ms-3">
            <img src={appStore} alt="google play" />
          </div>
        </div>
      </div>
      <div className="picture d-flex justify-content-end items">
        <img src={image3} alt="image koki" />
      </div>
    </div>
  );
}
