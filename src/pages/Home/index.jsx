import { useState } from "react";
import {
  ContainerProduct,
  Header,
  ProductCard,
  Container,
} from "../../component";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search`);
  };

  console.log(value);

  return (
    <Container
      onChange={(e) => setValue(e.target.value)}
      onSubmit={submitSearch}
    >
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
