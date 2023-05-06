import { Button, Skeleton, Input, LabelPages } from "../../../../component";
import "./style.scss";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTag,
  deleteTag,
  fetchTag,
  updateTag,
} from "../../../../features/TagSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Tag() {
  const dispatch = useDispatch();
  const tags = useSelector((data) => data.tag.tag);
  const loading = useSelector((data) => data.tag.pending);
  const [valueSearch, setValueSearch] = useState("");
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState();

  const deleteData = (id) => {
    dispatch(deleteTag({ id }));
  };

  const search = (e) => {
    e.preventDefault();
    dispatch(fetchTag(`${process.env.REACT_APP_URL}/tag?q=${valueSearch}`));
  };

  const tambah = () => {
    Swal.fire({
      title: `Tambah Tag`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Tambah",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        try {
          const actionResult = await dispatch(addTag({ name }));
          const result = unwrapResult(actionResult);

          if (result) {
            Swal.fire("Success!", "Berhasil Menambahkan Tag", "success");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal menambahkan Tag",
          });
        }
      },
    });
  };

  const edit = ({ id, name }) => {
    Swal.fire({
      title: `Edit Tag "${name}"`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Edit",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        try {
          const actionResult = await dispatch(updateTag({ id, name }));
          const result = unwrapResult(actionResult);

          if (result) {
            Swal.fire("Success!", "Berhasil Merubah Tag", "success");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal Merubah Tag",
          });
        }
      },
    });
  };

  useEffect(() => {
    if (valueSearch === "") {
      dispatch(
        fetchTag(
          `${process.env.REACT_APP_URL_API}/tag?q=${valueSearch}&limit=${limit}&skip=${skip}`
        )
      );
    }
  }, [dispatch, valueSearch, limit, skip]);

  return (
    <ContainerAdmin>
      <LabelPages label="Konfigurasi Tag">
        <div className="d-flex">
          <Input
            placeholder="Search Tag.."
            onChage={(e) => setValueSearch(e.target.value)}
            onSubmit={search}
          />
          <div className="border-end mx-3"></div>
          <Button onClick={tambah} className="btn-success">
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
            <th scope="col " className="w-100">
              {loading ? <Skeleton height={22} /> : "Name tag"}
            </th>
            <th scope="col" className="text-center">
              {loading ? <Skeleton height={22} /> : "Action"}
            </th>
          </tr>
        </thead>
        <tbody>
          {tags?.map((list, index) => (
            <tr key={++index}>
              <th scope="row">
                {loading ? <Skeleton height={22} width={20} /> : ++index}
              </th>
              <td className="w-100">
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
