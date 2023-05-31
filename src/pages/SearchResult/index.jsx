import { useEffect } from "react";
import {
  Container,
  ContainerProduct,
  Pagination,
  ProductCard,
  Select,
} from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchTag } from "../../features/TagSlice";
import { useState } from "react";
import "./style.scss";
import { queryProduct } from "../../features/ProductSlice";
import { searchIlustration } from "../../assets";
import { useLocation } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

export default function SearchResult() {
  const dispatch = useDispatch();
  const params = new URLSearchParams(document?.location.search);
  const searchParams = params.get("q");
  const location = useLocation();
  const tags = useSelector((data) => data.tag.tag);
  const data = useSelector((state) => state.product.products.data);
  const count = useSelector((state) => state.product.products.count);
  const [value, setValue] = useState(searchParams ? searchParams : "");
  const [tag, setTag] = useState([]);
  const [size, setSize] = useState(18);
  const [current, setCurrent] = useState(1);

  console.log("current ==>", current);
  //request get data tag to server
  useEffect(() => {
    dispatch(fetchTag());
  }, [dispatch]);

  //onSubmit Search Product
  const searchProduct = (e) => {
    e.preventDefault();
    dispatch(
      queryProduct(
        `${
          process.env.REACT_APP_URL_API
        }/products?q=${value}&status=true&tags=${[
          tag,
        ]}&limit=${size}&skip=${current}`
      )
    );
  };

  //filter product by tag
  const selectTag = (e) => {
    if (tag.length >= 3) {
      alert("filter tag max 3");
    } else if (
      e.target.value !== tag?.find((item) => item === e.target.value)
    ) {
      setTag([...tag, e.target.value]);
    }
  };

  //delete fiter tag
  const deleteTag = (select) => {
    console.log(tag.indexOf(select));
    setTag(
      tag
        .splice(0, tag.indexOf(select))
        .concat(tag.slice(tag.indexOf(select) + 1))
    );
  };

  //request data product to server by filter tag & search product
  useEffect(() => {
    dispatch(
      queryProduct(
        `${process.env.REACT_APP_URL_API}/products?q=${
          searchParams ? searchParams : value
        }&status=true&tags=${[tag]}&limit=${size}&skip=${current}`
      )
    );
  }, [dispatch, value, searchParams, tag, current, size]);

  return (
    <Container setValue={setValue} value={value} onSubmit={searchProduct}>
      <div className="search-result">
        <div className="container">
          <div className="filter-tag d-flex">
            <div className="w-25">
              <Select
                data={tags}
                onChange={selectTag}
                defaultValue="Filter Tags"
              />
            </div>
            <div className="d-flex justiy-content-center align-items-center ms-2">
              {tag?.map((list, index) => (
                <div className="tag d-flex px-2" key={++index}>
                  <div key={++index}>{list}</div>
                  <div onClick={() => deleteTag(list)} className="close ms-2">
                    <AiFillCloseCircle />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContainerProduct>
            {data?.length > 0 ? (
              <>
                {data?.map((item, index) => (
                  <ProductCard
                    data={item}
                    index={index}
                    from={{ name: "search", url: location.pathname }}
                  />
                ))}
              </>
            ) : (
              <div className="search-not-found d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex justify-content-center">
                  <img src={searchIlustration} alt="search" />
                </div>
                <div className="mt-4 text-center">
                  <span className="fw-bold">Sorry,</span> Data Not Found!
                </div>
              </div>
            )}
          </ContainerProduct>
          {data?.length > 24 && (
            <Pagination
              setSize={setSize}
              size={size}
              current={current}
              setCurrent={setCurrent}
              product={data}
              totalResult={count}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
