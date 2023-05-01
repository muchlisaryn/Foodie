import { Button } from "../../../../component";
import "./style.scss";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import LabelPages from "../../../../component/molecules/LabelPages";
import Swal from "sweetalert2";

export default function Tag() {
  const edit = ({ id, name }) => {
    Swal.fire({
      title: `edit tag "${name}"`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };

  return (
    <ContainerAdmin>
      <LabelPages label="Konfigurasi Tag"></LabelPages>
      <table className="table table-borderless border">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name Tag</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td className="w-75">Terlaris</td>
            <td className="d-flex">
              <>
                <Button className="btn-sm">Edit</Button>
                <Button className="btn-sm ms-2">Delete</Button>
              </>
            </td>
          </tr>
        </tbody>
      </table>
    </ContainerAdmin>
  );
}
