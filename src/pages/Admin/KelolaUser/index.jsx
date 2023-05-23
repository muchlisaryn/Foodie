import { useNavigate } from "react-router-dom";
import { Button, LabelPages, Sidebar, Skeleton } from "../../../component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUser } from "../../../features/UserSlice";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";

export default function KelolaUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.users.pending);
  const data = useSelector((state) => state.users.users);

  //request to server delete data user by id
  const deleteData = (id) => {
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
          const actionResult = await dispatch(deleteUser({ id }));
          const result = unwrapResult(actionResult);
          if (result) {
            Swal.fire("Deleted!", "Berhasil Menghapus User.", "success");
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal Menghapus User",
          });
        }
      }
    });
  };

  //request get data user to server
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Sidebar>
      <LabelPages label="Kelola User">
        <div>
          <Button
            type="btn-add"
            className="btn-sm"
            onClick={() => navigate("/admin/kelola-user/add-user")}
          >
            Tambah
          </Button>
        </div>
      </LabelPages>
      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col">
              {loading ? <Skeleton height={22} width={20} /> : "No"}
            </th>
            <th scope="col " className="w-25">
              {loading ? <Skeleton height={22} /> : "Name"}
            </th>
            <th scope="col" className="w-50">
              {loading ? <Skeleton height={22} /> : "Email"}
            </th>
            <th scope="col" className="w-25">
              {loading ? <Skeleton height={22} /> : "Role"}
            </th>
            <th scope="col" className="text-center">
              {loading ? <Skeleton height={22} /> : "Action"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((list, index) => (
            <tr key={++index}>
              <th scope="row">
                {loading ? <Skeleton height={22} width={20} /> : ++index}
              </th>
              <td className="w-25">
                {loading ? <Skeleton height={22} /> : list?.full_name}
              </td>
              <td className="w-50">
                {loading ? <Skeleton height={22} /> : list?.email}
              </td>
              <td className="w-25">
                {loading ? <Skeleton height={22} /> : list?.role}
              </td>
              <td className="d-flex">
                <>
                  {loading ? (
                    <Skeleton width={45} height={22} className="ms-2" />
                  ) : (
                    <Button
                      className="btn-sm bg-danger text-light ms-2"
                      onClick={() => deleteData(list?._id)}
                    >
                      Delete
                    </Button>
                  )}
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Sidebar>
  );
}
