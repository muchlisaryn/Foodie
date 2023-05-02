import { Button } from "../../../../component";
import "./style.scss";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import LabelPages from "../../../../component/molecules/LabelPages";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTag, deleteTag, fetchTag } from "../../../../features/TagSlice";

export default function Tag() {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.tag.tag);
  const loading = useSelector((data) => data.tag.pending);
  const err = useSelector((data) => data.tag.errorMessage);

  console.log("ini error", err);

  const deleteData = (id) => {
    dispatch(deleteTag({ id }));
  };

  const tambah = () => {
    Swal.fire({
      title: `Tambah Tag`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Edit",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        dispatch(addTag({ name }));
        // return axios
        //   .post(`${process.env.REACT_APP_URL}/tag`, { name })
        //   .then((response) => {
        //     console.log(response);
        //     if (!response.statusText === "OK") {
        //       throw new Error(response.statusText);
        //     }
        //     Swal.fire({
        //       title: `Berhasil Menambahkan Data`,
        //     });
        //   })
        //   .catch((error) => {
        //     Swal.showValidationMessage(`Request failed: ${error}`);
        //   });
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
      preConfirm: (name) => {
        return axios
          .put(`${process.env.REACT_APP_URL}/tag/${id}`, { name })
          .then((response) => {
            console.log(response);
            if (!response.statusText === "OK") {
              throw new Error(response.statusText);
            }
            Swal.fire({
              title: `Berhasil merubah data`,
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
    });
  };

  useEffect(() => {
    dispatch(fetchTag());
  }, []);

  return (
    <ContainerAdmin>
      <LabelPages label="Konfigurasi Tag">
        <Button onClick={tambah} className="btn-success">
          Tambah
        </Button>
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
          {data?.map((list, index) => (
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
