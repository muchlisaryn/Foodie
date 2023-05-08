import { useState } from "react";
import {
  ContainerProduct,
  Header,
  ProductCard,
  Container,
} from "../../component";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [value, setValue] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search`);
  };

  return (
    <Container value={query} setValue={setValue} onSubmit={submitSearch}>
      <Header title="Product" />
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
