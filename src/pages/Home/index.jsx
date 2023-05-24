import { ContainerProduct, ProductCard, Navbar } from "../../component";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryProduct } from "../../features/ProductSlice";
import { getCart } from "../../features/CartSlice";
import { poster1, poster2 } from "../../assets";

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
    <Navbar>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={poster1}
              className="d-block w-100 rounded"
              alt="poster1"
            />
          </div>
          <div className="carousel-item">
            <img
              src={poster2}
              className="d-block w-100 rounded"
              alt="poster2"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="d-flex justify-content-between my-3">
        <div>Product</div>
        <NavLink
          to="/search"
          style={{ textDecoration: "none", color: "#fd4d05" }}
        >
          Lihat Semua
        </NavLink>
      </div>

      <ContainerProduct>
        {data?.map((item, index) => (
          <ProductCard data={item} key={++index} />
        ))}
      </ContainerProduct>
    </Navbar>
  );
}
