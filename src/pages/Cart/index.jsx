import { useEffect, useState } from "react";
import { Button, Input, Navbar, Quantity } from "../../component";
import { formatRupiah } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart, updateCart } from "../../features/CartSlice";
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

  //send request edit qty + 1 ke server
  const plusQty = (quantity, id) => {
    const qty = (quantity += 1);
    dispatch(updateCart({ qty, token: auth, id }));
  };

  //send request edit qty - 1 ke server
  const minQty = (quantity, id) => {
    const qty = (quantity -= 1);
    dispatch(updateCart({ qty, token: auth, id }));
  };

  //menghitung total harga di cart
  const totalPrice = () => {
    const product = data?.map((item) => item?.total);
    return product?.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  };

  //request mendapatkan data cart berdasarkan auth atau user yang sedang login
  useEffect(() => {
    dispatch(getCart(auth));
  }, [dispatch]);

  //menghapus item di keranjang dengan mengirimkan parameter id
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
                <NavLink to={`/product/${item?._id}`}>
                  <div className="img-cart">
                    <img
                      src={item?.product?.image_url}
                      className="rounded w-100 "
                      alt="..."
                    />
                  </div>
                </NavLink>
                <NavLink to={`/product/${item?._id}`} className="title">
                  <div>{item?.product?.name}</div>
                </NavLink>
                <div>{formatRupiah(parseInt(item?.total))}</div>
                <div className="qty">
                  <Quantity
                    value={item?.qty}
                    plusQty={() => plusQty(item?.qty, item?._id)}
                    minQty={() => minQty(item?.qty, item?._id)}
                  />
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
              <div>
                Total :{" "}
                {data.length > 0
                  ? formatRupiah(parseInt(totalPrice()))
                  : formatRupiah(0)}
              </div>
              <Button
                className="bg-light text-black"
                onClick={() =>
                  data?.length
                    ? navigate("/checkout", {
                        state: data,
                      })
                    : alert("keranjang masih anda kosong")
                }
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
