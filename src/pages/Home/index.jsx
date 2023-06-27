import { Navbar } from "../../component";
import { OrderByMobileApp, SpecialOffers } from "./Parts";
import Footer from "../../component/molecules/Footer";
import Header from "./Parts/Header";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <SpecialOffers />
      <OrderByMobileApp />
      <Footer />
    </>
  );
}
