import Logo from "../../atoms/Logo";
import "./styles.scss";

export default function Footer() {
  return (
    <footer className="border-top">
      <div className="h-100 d-flex align-items-center ">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="logo">
                <Logo />
                <div>Jln. Cempaka Putih Barat 10520</div>
              </div>
            </div>
            <div className="col ">ss</div>
            <div className=" col ">ss</div>
            <div className=" col ">ss</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
