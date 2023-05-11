import { useEffect } from "react";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import Swal from "sweetalert2";
import { LabelPages, Button, Skeleton } from "../../../../component";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "../../../../features/CategorySlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Category() {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.category.categories);
  const loading = useSelector((data) => data.category.pending);

  const deleteData = (id) => {
    console.log("id", id);
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
          const actionResult = await dispatch(deleteCategory({ id }));
          const result = unwrapResult(actionResult);
          if (result) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal menghapus category",
          });
        }
      }
    });
  };

  const tambah = () => {
    Swal.fire({
      title: `Tambah Category`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Tambah",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        try {
          const actionResult = await dispatch(addCategory({ name }));
          const result = unwrapResult(actionResult);
          if (result) {
            Swal.fire("Success!", "Berhasil Menambahkan Category", "success");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal menambahkan Category",
          });
        }
      },
    });
  };

  const edit = ({ id, name }) => {
    Swal.fire({
      title: `Edit Category "${name}"`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Edit",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        try {
          const actionResult = await dispatch(updateCategory({ id, name }));
          const result = unwrapResult(actionResult);
          if (result) {
            Swal.fire("Success!", "Berhasil Merubah Category", "success");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal Merubah Category",
          });
        }
      },
    });
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <ContainerAdmin>
      <LabelPages label="Konfigurasi Category">
        <div>
          <Button type="btn-add" onClick={tambah}>
            Tambah Category
          </Button>
        </div>
      </LabelPages>
      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col">
              {loading ? <Skeleton height={22} width={20} /> : "No"}
            </th>
            <th scope="col " className="w-100">
              {loading ? <Skeleton height={22} /> : "Name Category"}
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
              <td className="w-100">
                {" "}
                {loading ? <Skeleton height={22} /> : list?.name}
              </td>
              <td className="d-flex">
                <>
                  {loading ? (
                    <Skeleton width={45} height={22} />
                  ) : (
                    <Button
                      className="btn-sm bg-warning"
                      onClick={() => edit({ id: list._id, name: list?.name })}
                    >
                      Edit
                    </Button>
                  )}
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
    </ContainerAdmin>
  );
}
