import { AiTwotoneStar } from "react-icons/ai";
import "./style.scss";
import { NavLink } from "react-router-dom";

export default function ProductCard({ data, index }) {
  return (
    <NavLink to={`/product/${data?._id}`} className="product-card ">
      <div className="col" key={++index}>
        <div className="mb-2 border rounded">
          <div className="position-relative">
            {data?.discount > 0 && (
              <div className="discount position-absolute">{data?.discount}</div>
            )}
            <img src={data?.image_url} alt="product" />
          </div>
          <div className="desc-product py-2 px-2">
            <div>{data?.name}</div>
            <div className="d-flex fw-bold my-1">
              {data?.discount > 0 ? (
                <>
                  <div className="text-decoration-line-through">
                    {data?.price}
                  </div>
                  <div className="ms-1">{data?.current_price}</div>
                </>
              ) : (
                <div>{data?.price}</div>
              )}
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <AiTwotoneStar color="orange" />
                <div className="ms-1">5</div>
              </div>
              <div className="border-end mx-2"></div>
              <div>{data?.sold} Terjual</div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
