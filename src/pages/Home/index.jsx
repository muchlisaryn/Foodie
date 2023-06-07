import { Navbar } from "../../component";
import { OrderByMobileApp, SpecialOffers } from "./Parts";
import Footer from "../../component/molecules/Footer";

export default function Home() {
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
