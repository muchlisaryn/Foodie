import { useState } from "react";
import { ContainerProduct, ProductCard, Navbar } from "../../component";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryProduct } from "../../features/ProductSlice";

export default function Home() {
  const data = useSelector((state) => state?.product?.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  useEffect(() => {
    dispatch(
      queryProduct(`${process.env.REACT_APP_URL_API}/products?limit=10`)
    );
  }, [dispatch]);

  return (
    <Navbar value={query} setValue={setQuery} onSubmit={submitSearch}>
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
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://img.gesuri.id/img/content/2019/06/22/39351/pdi-perjuangan-jateng-megawati-harga-mati-jadi-ketua-umum-8O1ecLGxQm.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://pbs.twimg.com/media/EBDXuc3UEAYVx0Q.jpg:large"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://pbs.twimg.com/media/EBDXuc3UEAYVx0Q.jpg:large"
              className="d-block w-100"
              alt="..."
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
        <NavLink to="/search">Lihat Semua</NavLink>
      </div>
      <ContainerProduct>
        {data?.map((item, index) => (
          <ProductCard data={item} index={index} />
        ))}
      </ContainerProduct>
    </Navbar>
  );
}
