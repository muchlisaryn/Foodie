import { useEffect } from "react";
import { Button, Input, Navbar, Quantity } from "../../component";
import { formatRupiah } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "../../features/CartSlice";
import "./style.scss";
import { AiFillDelete } from "react-icons/ai";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { searchIlustration } from "../../assets";

export default function Cart() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.cart.cart);
  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(auth));
  }, [dispatch]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteAction = dispatch(deleteCart({ id, token: auth }));
        const result = unwrapResult(deleteAction);
        Swal.fire("Deleted!", "Your cart has been deleted.", "success");
      }
    });
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
                <Button
                  className="bg-danger text-white"
                  onClick={() => deleteItem(item?._id)}
                >
                  <AiFillDelete />
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="mt-5">
            <img src={searchIlustration} alt="ilustrasi" width={200} />
            <div className="text-center mt-2">
              Your <span className="fw-bold">Cart</span> Is Empty
            </div>
            <Button
              type="button-primary"
              className="my-2"
              onClick={() => navigate("/search")}
            >
              Shop Now
            </Button>
          </div>
        </div>
      )}
    </Navbar>
  );
}
