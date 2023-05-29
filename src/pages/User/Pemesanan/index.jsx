import { useDispatch, useSelector } from "react-redux";
import { Navbar, Widgets } from "../../../component";
import { useEffect } from "react";
import { getOrder } from "../../../features/OrderSlice";
import "./style.scss";
import { formatRupiah } from "../../../utils";
import { NavLink } from "react-router-dom";

export default function Pemesanan() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order.orders);

  //request get data order to server
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  console.log(data);

  return (
    <Navbar>
      <Widgets>
        <div className="list-transactions mb-2 fw-bold">Daftar Transaksi</div>
        {data?.length > 0 ? (
          <>
            {" "}
            {data?.map((item, index) => (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={`/invoice/${item?._id}`}
                key={++index}
              >
                <div className="list border rounded p-3 mb-2" key={item?._id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <img
                        src={item?.order_items[0]?.image}
                        alt="product"
                        style={{ width: "80px", height: "80px" }}
                        className="rounded"
                      />
                      <div className="ms-1 d-flex flex-column justify-content-between">
                        <div>
                          <div className="fw-bold">
                            {item?.order_items[0]?.name}
                          </div>
                          <div className="desc opacity-75">
                            {item?.order_items[0]?.qty} Product x{" "}
                            {formatRupiah(item?.order_items[0]?.price)}
                          </div>
                        </div>
                        {item?.order_items?.length > 1 && (
                          <div className="desc opacity-50  ">
                            +{item?.order_items?.length - 1} Product Lainya
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="border-start">
                      <div className="p-3">
                        <div>Total Belanja</div>
                        <div className="fw-bold">
                          {formatRupiah(item?.total)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </>
        ) : (
          <div className="d-flex justify-content-center mt-5 ">
            Opps, Your order is empty
          </div>
        )}
      </Widgets>
    </Navbar>
  );
}
