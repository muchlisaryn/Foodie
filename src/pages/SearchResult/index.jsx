import { useEffect } from "react";
import {
  Container,
  ContainerProduct,
  ProductCard,
  Select,
} from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchTag } from "../../features/TagSlice";
import { useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";

export default function SearchResult() {
  const dispatch = useDispatch();
  const tags = useSelector((data) => data.tag.tag);
  const [tag, setTag] = useState([]);
  const { value } = useParams();

  console.log(value);

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
    setTag(
      tag
        .splice(0, tag.indexOf(select))
        .concat(tag.slice(tag.indexOf(select) + 1))
    );
  };

  useEffect(() => {
    dispatch(fetchTag(`${process.env.REACT_APP_URL_API}/tag`));
  }, [dispatch]);

  return (
    <Container>
      <div className="search-result d-flex align-items-center mb-2">
        <div>
          <Select data={tags} onChange={selectTag} />
        </div>
        <div className="d-flex ms-2">
          {tag?.map((list, index) => (
            <div className="tag d-flex">
              <div key={++index}>{list}</div>
              <div onClick={() => deleteTag(list)} className="close">
                x
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContainerProduct>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ContainerProduct>
    </Container>
  );
}
