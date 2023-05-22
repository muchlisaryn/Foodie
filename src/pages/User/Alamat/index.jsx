import { useNavigate } from "react-router-dom";
import { Button, Widgets, Navbar } from "../../../component";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress } from "../../../features/AddressSlice";

export default function Alamat() {
  const data = useSelector((state) => state.address.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    dispatch(fetchAddress({ token }));
  }, [dispatch]);

  const actionDelete = (id) => {
    dispatch(deleteAddress({ id, token }));
  };

  return (
    <Navbar>
      <Widgets>
        <div className="w-25">
          <Button
            type="btn-add"
            className="btn-sm"
            onClick={() => navigate("/user/alamat/add-alamat")}
          >
            Tambah Alamat
          </Button>
        </div>
        <div className="mt-2">
          {data.length > 0 ? (
            <>
              {data?.map((item) => (
                <div className="border rounded p-3 mb-2" key={item?._id}>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">{item?.name}</div>
                  </div>
                  <div>{item?.no_telephone}</div>
                  <div className="text-break">
                    {`${item?.detail}, Kel : ${item?.kelurahan}, Kec : ${item?.kecamatan}, kota : ${item?.kabupaten}, ${item?.provinsi}`}
                  </div>
                  <div className="d-flex mt-2">
                    <Button type="custom" className="btn-change">
                      Ubah
                    </Button>
                    <div className="border-end mx-2"></div>
                    <Button
                      type="custom"
                      className="btn-change"
                      onClick={() => actionDelete(item?._id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="d-flex justify-content-center mt-5 ">
              Opps, Address Not found
            </div>
          )}
        </div>
      </Widgets>
    </Navbar>
  );
}
