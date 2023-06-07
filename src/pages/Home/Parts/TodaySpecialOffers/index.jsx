import { useEffect } from "react";
import { Button, Skeleton } from "../../../../component";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialOffers } from "../../../../features/ProductSlice";
import { formatRupiah } from "../../../../utils";

export default function SpecialOffers() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.specialProducts);
  const loading = useSelector((state) => state.product.pending);
  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    dispatch(getSpecialOffers());
  }, [dispatch]);

  return (
    <div className="today-offers">
      <div className="text-center">
        <div className="h1 fw-bold">
          Today <span className="text-orange">Best</span>Seller
        </div>
        <div className="d-flex justify-content-center pt-2">
          <p className="description ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-2  row-cols-md-4">
          {data?.map((item) => (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`product/${item?._id}`}
              key={item._id}
            >
              <div className="col ">
                <div className="card border rounded p-2">
                  {loading ? (
                    <Skeleton height={100} />
                  ) : (
                    <img
                      className="card-img-top rounded"
                      src={item?.image_url}
                      alt="Card "
                    />
                  )}
                  <div className="card-body text-center">
                    <h5 className="fw-bold">
                      {loading ? (
                        <div className="w-100">
                          <Skeleton />
                        </div>
                      ) : (
                        formatRupiah(item?.current_price)
                      )}
                    </h5>
                    <p className="card-text">
                      {loading ? <Skeleton /> : item?.name}
                    </p>

                    {loading ? (
                      <Skeleton />
                    ) : (
                      <Button
                        type="button-primary"
                        onClick={() =>
                          navigate("/checkout", {
                            state: {
                              product: item,
                              qty: 1,
                              total: parseInt(1 * item?.current_price),
                              from: "Buy Now",
                            },
                          })
                        }
                      >
                        Buy Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
