import { useEffect } from "react";
import { Button, Skeleton } from "../../../../component";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialOffers } from "../../../../features/ProductSlice";
import { formatRupiah } from "../../../../utils";
import { TbShoppingCartPlus } from "react-icons/tb";

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
    <div className="today-offers my-5">
      <div className="text-center">
        <div className="h1 fw-bold">
          <span className="text-orange">Best</span> Seller
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
          {data.length > 4 ? (
            <>
              {data?.map((item) => (
                <div className="col" key={item._id}>
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
                    <div className=" text-center">
                      <h5 className="fw-bold text-black mt-3">
                        {loading ? (
                          <div className="w-100">
                            <Skeleton />
                          </div>
                        ) : (
                          formatRupiah(item?.current_price)
                        )}
                      </h5>
                      <h4 className="mt-2 mb-3">{item?.name}</h4>
                      <div className="d-flex ">
                        <div className="w-25">
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
                            <TbShoppingCartPlus />
                          </Button>
                        </div>
                        <div className="w-75 ms-1">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="col">
                <Skeleton height={350} />
              </div>
              <div className="col">
                <Skeleton height={350} />
              </div>
              <div className="col">
                <Skeleton height={350} />
              </div>
              <div className="col">
                <Skeleton height={350} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
