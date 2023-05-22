import { useEffect } from "react";
import { Button, Input, LabelPages, Navbar } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../../features/AddressSlice";
import { useState } from "react";
import { BsFillPatchCheckFill, BsFillInfoCircleFill } from "react-icons/bs";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatRupiah } from "../../utils";
import { order } from "../../features/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Checkout() {
  const dataAddress = useSelector((state) => state.address.address);
  const loading = useSelector((state) => state.address.pending);
  const token = localStorage.getItem("auth");
  const [address, setAddress] = useState();
  const [disabledButton, setDisabledButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  //menjumlahkan total pemesanan yang ada di keranjang
  const getTotal = data
    ?.map((item) => item.total)
    .reduce((acc, cur) => acc + cur);

  //ongkir
  const Ongkir = 20000;

  //send data order ke server
  const sendOrder = async () => {
    const acationOrder = await dispatch(
      order({
        token,
        delivery_fee: Ongkir,
        delivery_address: address?._id,
      })
    );
    const result = await unwrapResult(acationOrder);
    console.log("result ==>", result);
    if (result._id) {
      navigate(`/invoice/${result._id}`);
    } else {
      navigate("*", {
        state: {
          error: "Checkout Failed",
          message:
            "Something went wrong with your request. Please try again later",
        },
      });
    }
  };

  //tombol back untuk kembali ke halaman home
  const backButton = () => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  //request data alamat user ke server
  useEffect(() => {
    dispatch(fetchAddress({ token }));
  }, [dispatch, token]);

  //hooks untuk tombol checkout
  useEffect(() => {
    if (address === undefined) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [address]);

  //menyimpan alamat ke local state address
  const selectAddress = (item) => {
    setAddress(item);
  };

  return (
    <Navbar>
      <div>
        <LabelPages type="back" label="Checkout" onClick={backButton} />
        {address?._id ? (
          <div className="border  rounded bg-success text-light p-2 px-4 mb-2">
            <div className="d-flex align-items-center">
              <BsFillPatchCheckFill />
              <span className="ms-2"> address selected</span>
            </div>
          </div>
        ) : (
          <div className="border  rounded bg-danger text-light p-2 px-4 mb-2">
            <div className="d-flex align-items-center">
              <BsFillInfoCircleFill />
              <span className="ms-2">Please select one address</span>
            </div>
          </div>
        )}
        <table className="border table table-sm">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Pilih
              </th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {dataAddress?.map((item) => (
              <tr className={address?._id === item?._id ? "table-success" : ""}>
                <th className="text-center">
                  <Input
                    type="radio"
                    onChange={() => selectAddress(item)}
                    value={address}
                    name="address"
                    id={item?._id}
                  />
                </th>
                <td>{item?.name}</td>
                <td className="w-50">{`${item?.detail} , Kecamatan ${item?.kecamatan}, Kelurahan ${item?.kelurahan}, ${item?.kabupaten}, ${item?.provinsi}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="product-checkout">
          <div className="border-bottom mb-2 pb-1 fw-bold">Detail Product</div>
          <table className="table table-borderless">
            <tbody>
              {data?.map((item) => (
                <tr>
                  <td>
                    <img
                      src={item?.product?.image_url}
                      alt="img"
                      className="border"
                    />
                  </td>
                  <td className="d-flex align-items-center">{`${
                    item?.product.name
                  }  (${item?.qty} x ${formatRupiah(
                    parseInt(item?.product.price)
                  )})`}</td>
                  <td className="text-end fw-bold">
                    {`${formatRupiah(parseInt(item?.total))}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="border-bottom mb-2 pb-1 fw-bold">
            Rincian Pembayaran
          </div>
          <div className="d-flex justify-content-between">
            <div>Total Harga ({data?.length} product)</div>
            <div>{formatRupiah(parseInt(getTotal))}</div>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <div>Ongkir</div>
            <div>{formatRupiah(Ongkir)}</div>
          </div>
          <div className="border-top d-flex justify-content-between mt-2 fw-bold">
            <div>total</div>
            <div>{formatRupiah(parseInt(getTotal + Ongkir))}</div>
          </div>

          <Button
            className="bg-success text-light my-3 w-100 "
            onClick={sendOrder}
            disabled={disabledButton}
          >
            {loading ? "Loading..." : "Checkout"}
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
