import { AiTwotoneStar } from "react-icons/ai";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { formatRupiah } from "../../../utils";
import Skeleton from "../../atoms/Skeleton";
import { useSelector } from "react-redux";

export default function ProductCard({ data, index }) {
  const loading = useSelector((state) => state.product?.pending);

  return (
    <NavLink to={`/product/${data?._id}`} className="product-card ">
      <div className="col" key={++index}>
        <div className="mb-2 border rounded">
          {loading ? (
            <Skeleton height={100} />
          ) : (
            <div className="position-relative">
              {data?.discount > 0 && (
                <div className="discount position-absolute">
                  Discount {data?.discount} %
                </div>
              )}
              <img src={data?.image_url} alt="product" />
            </div>
          )}
          <div className="desc-product py-2 px-2">
            {loading ? (
              <Skeleton />
            ) : (
              <div className="text-truncate">{data?.name}</div>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <div className="price d-flex fw-bold my-1">
                {data?.discount > 0 ? (
                  <>
                    <div className="text-decoration-line-through">
                      {formatRupiah(data?.price)}
                    </div>
                    <div className="ms-1">
                      {formatRupiah(data?.current_price)}
                    </div>
                  </>
                ) : (
                  <div>{formatRupiah(data.price)}</div>
                )}
              </div>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <AiTwotoneStar color="orange" />
                  <div className="ms-1">5</div>
                </div>
                <div className="border-end mx-2"></div>
                <div>{data?.sold} Terjual</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </NavLink>
  );
}
