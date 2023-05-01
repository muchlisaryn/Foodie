import { AiTwotoneStar } from "react-icons/ai";
import "./style.scss";

export default function ProductCard() {
  return (
    <div className="col">
      <div className="product-card mb-2 border">
        <div className="position-relative">
          <div className="discount position-absolute">Diskon 50%</div>
          <img src="https://img.freepik.com/free-vector/cheese-snack-food-product-ad_52683-34031.jpg?w=360" />
        </div>
        <div className="desc-product py-2 px-2">
          <div>Cheese Snack</div>
          <div className="d-flex fw-bold my-1">
            <div className="text-decoration-line-through">Rp 20.000</div>
            <div className="ms-1">Rp 10.000</div>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <AiTwotoneStar color="orange" />
              <div className="ms-1">5</div>
            </div>
            <div className="border-end mx-2"></div>
            <div>5 Terjual</div>
          </div>
        </div>
      </div>
    </div>
  );
}
