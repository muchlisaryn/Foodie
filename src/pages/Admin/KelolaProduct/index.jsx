import { Button, LabelPages, Skeleton, Switcher } from "../../../component";
import ContainerAdmin from "../../../component/container/ContainerAdmin";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProduct,
  updateProduct,
} from "../../../features/ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function KelolaProduct() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.pending);
  const data = useSelector((state) => state.product.products);

  const deleteData = (id) => {
    dispatch(deleteProduct({ id }));
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const switchStatus = async ({ id, status }) => {
    try {
      const actionResult = await dispatch(
        updateProduct({ id, status: !status })
      );
      const result = unwrapResult(actionResult);
      console.log(result);
      if (result.error) {
        alert(result.message);
      }
    } catch (error) {
      alert("berhasil");
    }
  };

  return (
    <ContainerAdmin>
      <LabelPages label="Kelola Product">
        <Button className="btn-success">Tambah</Button>
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
                <tr key={++index}>
                  <td className="w-25">
                    {loading ? <Skeleton height={22} /> : list?.name}
                  </td>
                  <td>{loading ? <Skeleton height={22} /> : list?.sold}</td>
                  <td className="w-25">
                    {loading ? <Skeleton height={22} /> : list?.price}
                  </td>
                  <td className="w-25">
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
                  <td className="d-flex">
                    <>
                      {loading ? (
                        <Skeleton width={45} height={22} />
                      ) : (
                        <Button className="btn-sm bg-warning">Edit</Button>
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
