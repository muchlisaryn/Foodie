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

export default function KelolaProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loading = true;
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
        <Button
          className="btn-success"
          onClick={() => navigate("/admin/kelola-product/add-product")}
        >
          Tambah
        </Button>
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
                        <img
                          src="https://img.freepik.com/free-vector/cheese-snack-food-product-ad_52683-34031.jpg?w=360"
                          alt="photo product"
                        />
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
                  <td className="w-25 align-middle">
                    {loading ? (
                      <Skeleton height={22} />
                    ) : (
                      <div>{`${list?.sold} Tejual`}</div>
                    )}
                  </td>
                  <td className="w-25 align-middle">
                    {loading ? <Skeleton height={22} /> : list?.price}
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
