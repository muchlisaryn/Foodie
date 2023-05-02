import { Button } from "../../../../component";
import "./style.scss";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import LabelPages from "../../../../component/molecules/LabelPages";
import Swal from "sweetalert2";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Tag() {
  const [data, setData] = useState([]);

  const deleteProduct = async ({ id }) => {
    await axios.delete(`${process.env.REACT_APP_URL}/tag/${id}`);
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
        return axios
          .post(`${process.env.REACT_APP_URL}/tag`, { name })
          .then((response) => {
            console.log(response);
            if (!response.statusText === "OK") {
              throw new Error(response.statusText);
            }
            Swal.fire({
              title: `Berhasil Menambahkan Data`,
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
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

  const getData = useCallback(async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_URL}/tag`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
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
          {data?.map((list, index) => (
            <tr>
              <th scope="row">{++index}</th>
              <td className="w-100">{list?.name}</td>
              <td className="d-flex">
                <>
                  <Button
                    className="btn-sm bg-warning"
                    onClick={() => edit({ id: list._id, name: list?.name })}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-sm bg-danger text-light ms-2"
                    onClick={() => deleteProduct({ id: list?._id })}
                  >
                    Delete
                  </Button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContainerAdmin>
  );
}
