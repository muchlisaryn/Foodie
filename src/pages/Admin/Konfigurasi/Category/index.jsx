import { useEffect, useState } from "react";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import { LabelPages, Button } from "../../../../component";

export default function Category() {
  const [data, setData] = useState([]);

  const deleteProduct = async ({ id }) => {
    await axios.delete(`${process.env.REACT_APP_URL}/category/${id}`);
  };

  const tambah = () => {
    Swal.fire({
      title: `Tambah Category`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Edit",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return axios
          .post(`${process.env.REACT_APP_URL}/category`, { name })
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
      title: `Edit Category "${name}"`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Edit",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return axios
          .put(`${process.env.REACT_APP_URL}/category/${id}`, { name })
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

  const getData = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_URL}/category`);
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerAdmin>
      <LabelPages label="Konfigurasi Category">
        <Button onClick={tambah} className="btn-success">
          Tambah
        </Button>
      </LabelPages>
      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col " className="w-100">
              Name Category
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
