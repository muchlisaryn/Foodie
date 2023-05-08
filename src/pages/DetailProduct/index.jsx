import { useParams } from "react-router-dom";
import { Button, Container } from "../../component";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProduct } from "../../features/ProductSlice";
import { AiTwotoneStar } from "react-icons/ai";

export default function DetailProduct() {
  const data = useSelector((state) => state.product.detail);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailProduct({ id }));
  }, [dispatch]);
  return (
    <Container>
      <div className="detail-product d-flex justify-content-between ">
        <div className="w-75 d-flex">
          <div className="w-50 border">
            <img src={data?.image_url} className="w-100" />
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
            <div className="price fw-bold py-3">Rp {data?.price}</div>
            <div>{data?.description}</div>
            <div className="mt-5">
              <div className="detail fw-bold mb-2">Detail</div>
              <div className="d-flex">
                <div>Category :</div>
                <div className="ms-2 value">{data?.category?.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-25">
          <div className="border w-full rounded  p-2">
            <div>Atur Jumlah</div>
            <div className="d-flex">
              <div></div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Subtotal</div>
              <div>Rp.290000</div>
            </div>
            <div className="w-full">
              <Button type="btn-add" className="w-full">
                Keranjang
              </Button>
            </div>
            <Button>Beli Langsung</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
