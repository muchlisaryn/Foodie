import { useEffect } from "react";
import { Button, Input, Navbar, Quantity } from "../../component";
import { formatRupiah } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "../../features/CartSlice";
import "./style.scss";
import { AiFillDelete } from "react-icons/ai";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Cart() {
  const data = useSelector((state) => state.cart.cart);
  const auth = localStorage.getItem("auth");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(auth));
  }, [dispatch]);

  const deleteItem = (id) => {
    const deleteAction = dispatch(deleteCart({ id, token: auth }));
    const result = unwrapResult(deleteAction);
  };

  return (
    <Navbar>
      {data.length > 0 ? (
        <>
          {data?.map((item) => (
            <div className="cart mb-2">
              <div className="card-cart border rounded d-flex justify-content-between align-items-center p-3">
                <div>
                  <Input type="checkbox" />
                </div>
                <div className="img-cart">
                  <img
                    src={item?.product?.image_url}
                    className="rounded w-100 "
                    alt="..."
                  />
                </div>
                <div>{item?.product?.name}</div>
                <div>{formatRupiah(item?.product?.price * item?.qty)}</div>
                <div>
                  <Quantity value={item?.qty} />
                </div>
                <Button onClick={() => deleteItem(item?._id)}>
                  <AiFillDelete />
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Data Not found</div>
      )}
    </Navbar>
  );
}
