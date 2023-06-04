import { Button } from "../../../../component";
import "./style.scss";
import { NavLink } from "react-router-dom";

export default function SpecialOffers() {
  return (
    <div className="today-offers">
      <div className="text-center">
        <div className="h1 fw-bold">
          Today <span className="text-orange">Special</span> Offers
        </div>
        <div className="d-flex justify-content-center pt-2">
          <p className="description ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-2  row-cols-md-4">
          <NavLink style={{ textDecoration: "none", color: "black" }}>
            <div className="col ">
              <div className="card border rounded p-2">
                <img
                  className="card-img-top rounded"
                  src="https://static.vecteezy.com/system/resources/previews/001/209/957/original/square-png.png"
                  alt="Card "
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <Button type="button-primary">Buy Now</Button>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none", color: "black" }}>
            <div className="col ">
              <div className="card border rounded p-2">
                <img
                  className="card-img-top rounded"
                  src="https://static.vecteezy.com/system/resources/previews/001/209/957/original/square-png.png"
                  alt="Card "
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <Button type="button-primary">Buy Now</Button>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none", color: "black" }}>
            <div className="col ">
              <div className="card border rounded p-2">
                <img
                  className="card-img-top rounded"
                  src="https://static.vecteezy.com/system/resources/previews/001/209/957/original/square-png.png"
                  alt="Card "
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <Button type="button-primary">Buy Now</Button>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none", color: "black" }}>
            <div className="col ">
              <div className="card border rounded p-2">
                <img
                  className="card-img-top rounded"
                  src="https://static.vecteezy.com/system/resources/previews/001/209/957/original/square-png.png"
                  alt="Card "
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <Button type="button-primary">Buy Now</Button>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
