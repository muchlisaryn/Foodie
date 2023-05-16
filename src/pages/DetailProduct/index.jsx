import { useParams } from "react-router-dom";
import { Button, Container, Navbar, Quantity } from "../../component";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProduct } from "../../features/ProductSlice";
import { AiTwotoneStar } from "react-icons/ai";
import Breadcrumb from "../../component/atoms/Breadcrumb";
import { useState } from "react";
import { formatRupiah } from "../../utils";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";
import { addCart } from "../../features/CartSlice";

export default function DetailProduct() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.detail);
  const [quantity, setQuantity] = useState(1);

  const price = data?.price;
  const currentPrice = price * quantity;

  useEffect(() => {
    dispatch(fetchDetailProduct({ id }));
  }, [dispatch]);

  const dataBreadCrumb = [
    {
      name: "Home",
      url: "/search",
    },
    {
      name: "Detail Product",
      url: `/product/${id}`,
    },
  ];

  const addToCart = async (items) => {
    const add = await dispatch(
      addCart({ items, qty: quantity, price: currentPrice })
    );
    const result = await unwrapResult(add);
    if (result) {
      Swal.fire("Success!", "Berhasil Menambahkan ke Keranjang", "success");
    }
  };

  return (
    <Navbar>
      <Breadcrumb list={dataBreadCrumb} />
      <div className="detail-product d-flex justify-content-between ">
        <div className="w-75 d-flex">
          <div className="w-50 border">
            <img src={data?.image_url} className="w-100" alt="image" />
          </div>
          <div className="w-50 ms-2 ">
            <div className="title fw-bold text-break">{data?.name}</div>
            <div className="d-flex mt-2">
              <div>Terjual {data?.sold}</div>
              <div className="border-end mx-2"></div>
              <div className="d-flex align-items-center">
                <AiTwotoneStar color="orange" />
                <div className="ms-1">5</div>
                <div className="ms-2">(6 Rating)</div>
              </div>
            </div>
            <div className="price fw-bold py-3"></div>
            <div>{data?.description}</div>
            <div className="mt-5">
              <div className="detail fw-bold mb-2">Detail</div>
              <div className="d-flex">
                <div>Category :</div>
                <div className="ms-2 value">{data?.category?.name}</div>
              </div>
              <div className="d-flex">
                <div>Tags :</div>
                <div className="d-flex ms-2 value">
                  {data?.tags?.map((item) => (
                    <div>{item?.name} </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-25">
          <div className="border h-75 rounded  p-2">
            <div className="h-100">
              <div className="h-50 ">
                <div>Atur Jumlah</div>
                <div className="d-flex align-items-center h-100">
                  <div className="w-100">
                    <Quantity value={quantity} setValue={setQuantity} />
                    <div className="d-flex justify-content-between mt-3">
                      <div>Subtotal</div>
                      <div className="fw-bold">
                        {formatRupiah(currentPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-50 d-flex align-items-end">
                <div className="w-100">
                  <Button type="btn-add" onClick={() => addToCart(data)}>
                    Keranjang
                  </Button>
                  <Button type="button-secondary" className="mt-2">
                    Beli Langsung
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
