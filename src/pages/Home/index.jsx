import { Navbar } from "../../component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryProduct } from "../../features/ProductSlice";
import { getCart } from "../../features/CartSlice";

import { OrderByMobileApp, SpecialOffers } from "./Parts";
import Footer from "../../component/molecules/Footer";

export default function Home() {
  const data = useSelector((state) => state?.product?.products.data);
  const dispatch = useDispatch();

  //request get data product and cart to server
  useEffect(() => {
    dispatch(
      queryProduct(`${process.env.REACT_APP_URL_API}/products?limit=10`)
    );
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="mt-5 pt-5"></div>
      <SpecialOffers />
      <OrderByMobileApp />
      <Footer />
    </>
  );
}
