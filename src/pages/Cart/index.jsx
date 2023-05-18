import { useEffect, useState } from "react";
import { Button, Input, Navbar, Quantity } from "../../component";
import { formatRupiah } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "../../features/CartSlice";
import "./style.scss";
import { AiFillDelete } from "react-icons/ai";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { searchIlustration } from "../../assets";

export default function Cart() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.cart.cart);
  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();

  const totalPrice = () => {
    const product = data?.map((item) => item.product.price * item.qty);
    return product.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  };

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
        if (result) {
          Swal.fire("Deleted!", "Your cart has been deleted.", "success");
        }
      }
    });
  };

  return (
    <Navbar>
      {data.length > 0 ? (
        <div className="mb-5">
          {data?.map((item) => (
            <div className="cart mb-2">
              <div className="card-cart border rounded d-flex justify-content-between align-items-center p-3">
                <NavLink to={`/product/${data?._id}`}>
                  <div className="img-cart">
                    <img
                      src={item?.product?.image_url}
                      className="rounded w-100 "
                      alt="..."
                    />
                  </div>
                </NavLink>
                <NavLink to={`/product/${data?._id}`} className="title">
                  <div>{item?.product?.name}</div>
                </NavLink>
                <div>{formatRupiah(item?.product?.price * item?.qty)}</div>
                <div className="qty">
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
        </div>
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
      <div className="fixed-bottom">
        <div className="d-flex justify-content-center">
          <div className="checkout border w-75 py-4 px-4 mb-2">
            <div className="d-flex justify-content-between align-items-center  text-light">
              <div>Total : {formatRupiah(totalPrice())}</div>
              <Button className="bg-light">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
