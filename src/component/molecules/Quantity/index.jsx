import { useState } from "react";
import Button from "../../atoms/Button";
import "./style.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Quantity({ value, setValue, plusQty, minQty }) {
  const [minDisable, setMinDisable] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    if (value === 1 || value === undefined) {
      setMinDisable(true);
    } else {
      setMinDisable(false);
    }
  }, [value, setValue, minDisable]);

  const clickPlus = () => {
    setValue(value + 1);
  };

  const clickMin = () => {
    setValue(value - 1);
  };

  return (
    <div className="quantity d-flex align-items-center  w-100  rounded">
      <Button
        type="custom"
        className="w-25 btn-custom-left d-flex align-items-center justify-content-center p-2"
        onClick={auth ? (minQty ? minQty : clickMin) : () => navigate("/login")}
        disabled={minDisable}
      >
        -
      </Button>
      <div className="text-center w-100">{value}</div>
      <Button
        type="custom"
        className="w-25 btn-custom-right  d-flex align-items-center justify-content-center p-2 "
        onClick={
          auth ? (plusQty ? plusQty : clickPlus) : () => navigate("/login")
        }
      >
        +
      </Button>
    </div>
  );
}
