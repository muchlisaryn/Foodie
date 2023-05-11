import { useState } from "react";
import Button from "../../atoms/Button";
import "./style.scss";
import { useEffect } from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";

export default function Quantity({ value, setValue }) {
  const [minDisable, setMinDisable] = useState(false);

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
        onClick={clickMin}
        disabled={minDisable}
      >
        <HiMinusSm />
      </Button>
      <div className="text-center w-100">{value}</div>
      <Button
        type="custom"
        className="w-25 btn-custom-right  d-flex align-items-center justify-content-center p-2 "
        onClick={clickPlus}
      >
        <HiPlusSm />
      </Button>
    </div>
  );
}
