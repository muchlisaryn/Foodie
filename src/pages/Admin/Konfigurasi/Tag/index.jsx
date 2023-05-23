import {
  Button,
  Skeleton,
  Input,
  LabelPages,
  Sidebar,
} from "../../../../component";
import "./style.scss";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTag,
  deleteTag,
  queryTag,
  updateTag,
} from "../../../../features/TagSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Tag() {
  const dispatch = useDispatch();
  const tags = useSelector((data) => data.tag.tag);
  const loading = useSelector((data) => data.tag.pending);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState();

  //function request delete data tag by id to server
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
          const actionResult = await dispatch(deleteTag({ id }));
          const result = unwrapResult(actionResult);
          if (result) {
            Swal.fire("Deleted!", "Tag Berhasil Dihapus", "success");
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal Menghapus Tag",
          });
        }
      }
    });
  };

  //onSubmit search tag
  const search = (e) => {
    e.preventDefault();
    dispatch(queryTag(`${process.env.REACT_APP_URL}/tag?q=${query}`));
  };

  //function request new data tag to server
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

  //function request edit data tag to server
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

  //request get data tag to server
  useEffect(() => {
    dispatch(
      queryTag(
        `${process.env.REACT_APP_URL_API}/tag?q=${query}&limit=${limit}&skip=${skip}`
      )
    );
  }, [dispatch, query, limit, skip]);

  return (
    <Sidebar>
      <LabelPages label="Konfigurasi Tag">
        <div className="d-flex">
          <Input
            placeholder="Search Tag.."
            onChange={(e) => setQuery(e.target.value)}
            onSubmit={search}
          />
          <div className="border-end mx-3"></div>
          <Button type="btn-add" onClick={tambah}>
            Tambah
          </Button>
        </div>
      </LabelPages>

      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col " className="w-100">
              Name Tag
            </th>
            <th scope="col" className="text-center">
              Action
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
      {tags?.length === 0 && (
        <div className="d-flex justify-content-center">
          Data "{query}" Not Found
        </div>
      )}
    </Sidebar>
  );
}
