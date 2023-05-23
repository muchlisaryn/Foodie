import { Button, LabelPages, Skeleton, Switcher } from "../../../component";
import ContainerAdmin from "../../../component/container/ContainerAdmin";
import { useEffect } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProduct,
  updateProduct,
} from "../../../features/ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../utils";
import Swal from "sweetalert2";

export default function KelolaProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const loading = useSelector((state) => state.product.pending);
  const data = useSelector((state) => state.product.products);

  //delete product by id
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
          const actionResult = await dispatch(deleteProduct({ id, token }));
          const result = unwrapResult(actionResult);
          if (result) {
            Swal.fire("Deleted!", "Berhasil Menghapus Product.", "success");
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal Menghapus Product",
          });
        }
      }
    });
  };

  //request data get product to server
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  //update status product active or non active
  const switchStatus = async ({ id, status }) => {
    try {
      const actionResult = await dispatch(
        updateProduct({ id, status: !status, token })
      );
      const result = unwrapResult(actionResult);
      console.log(result);
      if (result.error) {
        alert(result.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Merubah data product",
      });
    }
  };

  return (
    <ContainerAdmin>
      <LabelPages label="Kelola Product">
        <div>
          <Button
            type="btn-add"
            onClick={() => navigate("/admin/kelola-product/add-product")}
          >
            Tambah Product
          </Button>
        </div>
      </LabelPages>
      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col " className="w-25">
              {loading ? <Skeleton height={22} /> : "Info Product"}
            </th>
            <th scope="col">
              {loading ? <Skeleton height={22} /> : "Terjual"}
            </th>
            <th scope="col" className="w-25">
              {loading ? <Skeleton height={22} /> : "Price"}
            </th>
            <th scope="col" className="w-25">
              {loading ? <Skeleton height={22} /> : "Aktif"}
            </th>
            <th scope="col" className="text-center">
              {loading ? <Skeleton height={22} /> : "Action"}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            <>
              {data?.map((list, index) => (
                <tr key={++index} className="product">
                  <td className="w-25">
                    <div className="d-flex align-items-center">
                      {loading ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <img src={list?.image_url} alt="photo product" />
                      )}
                      {loading ? (
                        <div className="w-100 ms-2">
                          <Skeleton height={22} />
                          <Skeleton height={22} />
                        </div>
                      ) : (
                        <div className="ms-2 fw-bold text-break title ">
                          {list?.name}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="align-middle">
                    {loading ? (
                      <Skeleton height={22} />
                    ) : (
                      <div>{`${list?.sold} Terjual`}</div>
                    )}
                  </td>
                  <td className="w-25 align-middle">
                    {loading ? (
                      <Skeleton height={22} />
                    ) : (
                      formatRupiah(list?.price)
                    )}
                  </td>
                  <td className="align-middle">
                    {loading ? (
                      <Skeleton height={22} />
                    ) : (
                      <Switcher
                        checked={list?.status}
                        onChange={() =>
                          switchStatus({ id: list?._id, status: list?.status })
                        }
                      />
                    )}
                  </td>
                  <td className=" align-middle">
                    <div className="d-flex">
                      {loading ? (
                        <Skeleton height={22} />
                      ) : (
                        <Button className="btn-sm bg-warning">Edit</Button>
                      )}

                      {loading ? (
                        <Skeleton height={22} />
                      ) : (
                        <Button
                          className="btn-sm bg-danger text-light ms-2"
                          onClick={() => deleteData(list?._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                {loading ? <Skeleton height={22} /> : "Data Not Found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ContainerAdmin>
  );
}
