import {
  ContainerProduct,
  Header,
  ProductCard,
  Container,
} from "../../component";

export default function Home() {
  return (
    <Container>
      <Header title="Product" />
      <ContainerProduct>
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
