import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Navbar, Quantity } from "../../component";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProduct } from "../../features/ProductSlice";
import { AiTwotoneStar } from "react-icons/ai";
import Breadcrumb from "../../component/atoms/Breadcrumb";
import { useState } from "react";
import { formatRupiah } from "../../utils";
import { addCart } from "../../features/CartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { token } from "../../utils";
import { Toast } from "../../component/atoms/Toast";

export default function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = useSelector((state) => state.product.detail);

  const [quantity, setQuantity] = useState(1);
  const price = data?.price;
  const currentPrice = price * quantity;

  //get cart & get detail product by id
  useEffect(() => {
    dispatch(fetchDetailProduct({ id }));
  }, [dispatch, id]);

  //list breadcrumb
  const dataBreadCrumb = [
    {
      name: location.state?.name,
      url: location.state?.url,
    },
    {
      name: data?.name,
      url: `/product/${id}`,
    },
  ];

  //add product to cart
  const addToCart = async (items) => {
    if (token()) {
      try {
        const actionAddCart = await dispatch(
          addCart({ items, qty: quantity, price: currentPrice })
        );
        const result = await unwrapResult(actionAddCart);
        if (result) {
          Toast({
            icon: "success",
            title: "Product Berhasil dimasukan kedalam keranjang",
            timer: 1000,
            position: "top",
          });
        }
      } catch (error) {
        console.log(error);
        Toast({
          icon: "error",
          title: "Product ini sudah ada di keranjang anda",
          timer: 3000,
          position: "top",
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Breadcrumb list={dataBreadCrumb} />
      <div className="detail-product d-flex flex-column flex-lg-row justify-content-between ">
        <div className="d-flex flex-column flex-md-row ">
          <div>
            <img src={data?.image_url} className="rounded" alt="product" />
          </div>
          <div className="d-flex flex-column justify-content-between my-2 my-md-0 ms-0 ms-md-3">
            <div className="title fw-bold text-break">{data?.name}</div>
            <div className="d-flex">
              <div>Terjual {data?.sold}</div>
              <div className="border-end mx-2"></div>
              <div className="d-flex align-items-center">
                <AiTwotoneStar color="orange" />
                <div className="ms-1">5</div>
                <div className="ms-2">(6 Rating)</div>
              </div>
            </div>
            <div className="price fw-bold py-3">
              {formatRupiah(data?.price)}
            </div>
            <div>{data?.description}</div>
            <div className="mt-5">
              <div className="detail fw-bold mb-2">Detail</div>
              <div className="d-flex">
                <div>Category :</div>
                <div className="ms-2 value">{data?.category?.name}</div>
              </div>
              <div className="d-flex pt-1">
                <div>Tags :</div>
                <div className="d-flex ms-2 ">
                  {data?.tags?.map((item) => (
                    <div className="tags rounded">{item?.name}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-lg-25 my-3 mt-lg-0">
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
                  <Button
                    type="button-secondary"
                    className="mt-2"
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          product: data,
                          qty: quantity,
                          total: parseInt(quantity * data?.current_price),
                          from: "Buy Now",
                        },
                      })
                    }
                  >
                    Beli Langsung
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
