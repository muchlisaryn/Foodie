import { useNavigate } from "react-router-dom";
import { Button, Widgets, Navbar } from "../../../component";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress } from "../../../features/AddressSlice";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Alamat() {
  const data = useSelector((state) => state.address.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //request get data address to server
  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  //request delete address by id to server
  const actionDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteAction = await dispatch(deleteAddress({ id }));
          const result = await unwrapResult(deleteAction);
          if (result) {
            Swal.fire("Deleted!", "Your adress has been deleted.", "success");
          }
        } catch (e) {
          console.log(e);
          Swal.fire("Opps", "Failed delete your address", "error");
        }
      }
    });
  };

  return (
    <Navbar>
      <Widgets>
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-bold">Alamat</div>
          <div>
            <Button
              type="btn-add"
              className="btn-sm"
              onClick={() => navigate("/alamat/add-alamat")}
            >
              Tambah Alamat
            </Button>
          </div>
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
