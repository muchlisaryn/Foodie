import { useEffect } from "react";
import { ContainerProduct, Navbar, ProductCard, Select } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchTag } from "../../features/TagSlice";
import { useState } from "react";
import "./style.scss";
import { queryProduct } from "../../features/ProductSlice";
import { searchIlustration } from "../../assets";

export default function SearchResult() {
  const dispatch = useDispatch();
  const params = new URLSearchParams(document?.location.search);
  const searchParams = params.get("q");
  const tags = useSelector((data) => data.tag.tag);
  const data = useSelector((state) => state.product.products);
  const [value, setValue] = useState(searchParams ? searchParams : "");
  const [tag, setTag] = useState([]);

  const searchProduct = (e) => {
    e.preventDefault();
    dispatch(
      queryProduct(`${process.env.REACT_APP_URL_API}/products?q=${value}`)
    );
  };

  const selectTag = (e) => {
    if (tag.length >= 3) {
      alert("filter tag max 3");
    } else if (
      e.target.value !== tag?.find((item) => item === e.target.value)
    ) {
      setTag([...tag, e.target.value]);
    }
  };

  const deleteTag = (select) => {
    console.log(tag.indexOf(select));
    setTag(
      tag
        .splice(0, tag.indexOf(select))
        .concat(tag.slice(tag.indexOf(select) + 1))
    );
  };

  useEffect(() => {
    dispatch(
      queryProduct(
        `${
          process.env.REACT_APP_URL_API
        }/products?q=${value}&status=true&tags=${[tag]}`
      )
    );
  }, [dispatch, value, tag]);

  useEffect(() => {
    dispatch(fetchTag());
  }, [dispatch]);

  return (
    <Navbar setValue={setValue} value={value} onSubmit={searchProduct}>
      <div className="search-result d-flex align-items-center mb-2">
        <div>
          <Select data={tags} onChange={selectTag} defaultValue="Filter Tags" />
        </div>
        <div className="d-flex ms-2">
          {tag?.map((list, index) => (
            <div className="tag d-flex" key={++index}>
              <div key={++index}>{list}</div>
              <div onClick={() => deleteTag(list)} className="close">
                x
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContainerProduct>
        {data?.length > 0 ? (
          <>
            {data?.map((item, index) => (
              <ProductCard data={item} index={index} />
            ))}
          </>
        ) : (
          <div className="search d-flex w-100 mt-5 justify-content-center align-items-center">
            <div>
              <img src={searchIlustration} alt="search" />
              <div className="mt-4 text-center">
                <span className="fw-bold">Sorry,</span> Data Not Found!
              </div>
            </div>
          </div>
        )}
      </ContainerProduct>
    </Navbar>
  );
}
