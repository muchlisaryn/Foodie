import { useDispatch, useSelector } from "react-redux";
import { ContainerUser } from "../../../component";
import { useEffect } from "react";
import { getOrder } from "../../../features/OrderSlice";

export default function Pemesanan() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order.orders);
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    dispatch(getOrder({ token: auth }));
  }, [dispatch]);

  console.log(data);

  return (
    <ContainerUser>
      <div>ss</div>
    </ContainerUser>
  );
}
