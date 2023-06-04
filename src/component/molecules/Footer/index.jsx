import Input from "../../atoms/Input";
import Logo from "../../atoms/Logo";
import "./styles.scss";

export default function Footer() {
  return (
    <>
      <footer className="border-top">
        <div className=" d-flex py-5">
          <div className="container">
            <div className="row row-cols-2  row-cols-md-5">
              <div className="col">
                <div className="logo">
                  <Logo />
                  <div className="mt-3">Jln. Cempaka Putih Barat 10520</div>
                </div>
              </div>
              <div className="col ">
                <div>
                  <div className="fw-bold fs-4 mb-3 pt-3 pt-md-0">About</div>
                  <div className="mb-1">About Us</div>
                  <div className="mb-1">Features</div>
                  <div className="mb-1">News</div>
                  <div className="mb-1">Menu</div>
                </div>
              </div>
              <div className=" col ">
                <div>
                  <div className="fw-bold fs-4 mb-3 pt-3 pt-md-0">Company</div>
                  <div className="mb-1">Why foodie?</div>
                  <div className="mb-1">Parter With Us</div>
                  <div className="mb-1">FAQ</div>
                  <div className="mb-1">Blog</div>
                </div>
              </div>
              <div className=" col ">
                <div>
                  <div className="fw-bold fs-4 mb-3 pt-3 pt-md-0">Support</div>
                  <div className="mb-1">Account</div>
                  <div className="mb-1">Support Center</div>
                  <div className="mb-1">FeedBack</div>
                  <div className="mb-1">Contact Us</div>
                  <div className="mb-1">Accesbility</div>
                </div>
              </div>
              <div className=" col ">
                <div>
                  <div className="fw-bold fs-4 mb-3 pt-3 pt-md-0">
                    Get In Touch
                  </div>
                  <div className="mb-1">
                    Questions or feedback? We'd love to hear from you
                  </div>
                  <Input type="text" className="mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center py-3">Copyright Foodie 2023</div>
    </>
  );
}
