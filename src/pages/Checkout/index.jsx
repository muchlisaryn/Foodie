import { useEffect } from "react";
import { Input, Navbar } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../../features/AddressSlice";
import { useState } from "react";

export default function Checkout() {
  const dataAddress = useSelector((state) => state.address.address);
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    dispatch(fetchAddress({ token }));
  }, [dispatch, token]);

  const selectAddress = (item) => {
    setAddress(item);
  };

  return (
    <Navbar>
      <div>
        <div className="mb-2">Checkout</div>
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {dataAddress?.map((item) => (
              <tr>
                <th className="text-center">
                  <Input
                    type="radio"
                    onChange={() => selectAddress(item)}
                    value={address}
                  />
                </th>
                <td>{item?.name}</td>
                <td className="w-50">{`${item?.detail} , Kecamatan ${item?.kecamatan}, Kelurahan ${item?.kelurahan}, ${item?.kabupaten}, ${item?.provinsi}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div>Product</div>
        </div>
      </div>
    </Navbar>
  );
}
