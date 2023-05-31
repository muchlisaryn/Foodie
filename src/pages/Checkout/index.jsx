import { useEffect } from "react";
import { Button, Container, Input, LabelPages, Navbar } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../../features/AddressSlice";
import { useState } from "react";
import { BsFillPatchCheckFill, BsFillInfoCircleFill } from "react-icons/bs";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatRupiah } from "../../utils";
import { buyNow, order } from "../../features/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Checkout() {
  const dataAddress = useSelector((state) => state.address.address);
  const loading = useSelector((state) => state.address.pending);
  const [address, setAddress] = useState();
  const [disabledButton, setDisabledButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  console.log("data", data);

  //ongkir
  const ongkir = 20000;

  //menjumlahkan total pemesanan
  const subTotal = () => {
    let total = 0;
    if (data?.data) {
      total = data.data.reduce((total, item) => total + item.total, 0);
    } else {
      total = data?.qty * data?.product?.current_price;
    }
    return total;
  };

  //menjumlahkan jumlah qty
  const totalQty = () => {
    let total = 0;
    if (data?.data) {
      total = data?.data.reduce((total, item) => total + item?.qty, 0);
    } else {
      total = data?.qty;
    }
    console.log(total);
    return total;
  };

  //send data order ke server
  const sendOrder = async () => {
    if (data?.from === "cart") {
      const acationOrder = await dispatch(
        order({
          delivery_fee: ongkir,
          delivery_address: address?._id,
        })
      );
      const result = await unwrapResult(acationOrder);
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
    } else {
      const acationOrder = await dispatch(
        buyNow({
          items: data,
          delivery_fee: ongkir,
          delivery_address: address?._id,
        })
      );
      const result = await unwrapResult(acationOrder);
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

  /*request data address user ke server , ketika alamat user masih kosong maka akan di redirect ke halaman alamat
  terlebih dahulu untuk membuat alamat
 */
  useEffect(() => {
    const getAddress = async () => {
      const action = await dispatch(fetchAddress());
      const result = await unwrapResult(action);
      if (result.length === 0) {
        navigate("/alamat");
        Swal.fire(
          "Alamat Anda Masih Kosong!",
          "Silahkan Tambahkan Alamat Terlebih Dahulu",
          "warning"
        );
      }
    };
    getAddress();
  }, [dispatch, navigate]);

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
    <Container>
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
            {data.data ? (
              data.data.map((item) => (
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
              ))
            ) : (
              <tr>
                <td>
                  <img
                    src={data?.product?.image_url}
                    alt="img"
                    className="border"
                  />
                </td>
                <td className="d-flex align-items-center">{`${
                  data?.product?.name
                }  (${data?.qty} x ${formatRupiah(
                  parseInt(data?.product?.current_price)
                )})`}</td>
                <td className="text-end fw-bold">
                  {`${formatRupiah(parseInt(data?.total))}`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <div className="border-bottom mb-2 pb-1 fw-bold">
          Rincian Pembayaran
        </div>
        <div className="d-flex justify-content-between">
          <div>Total Harga ({totalQty()} product)</div>
          <div>
            {formatRupiah(parseInt(data.data ? subTotal() : data?.total))}
          </div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div>ongkir</div>
          <div>{formatRupiah(ongkir)}</div>
        </div>
        <div className="border-top d-flex justify-content-between mt-2 fw-bold">
          <div>total</div>
          <div>{formatRupiah(parseInt(subTotal() + ongkir))}</div>
        </div>

        <Button
          className="bg-success text-light my-3 w-100 "
          onClick={sendOrder}
          disabled={disabledButton}
        >
          {loading ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </Container>
  );
}
