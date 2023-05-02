import { useNavigate } from "react-router-dom";
import { Button, LabelPages } from "../../../component";
import ContainerAdmin from "../../../component/container/ContainerAdmin";

export default function KelolaUser() {
  const navigate = useNavigate();

  return (
    <ContainerAdmin>
      <LabelPages label="Kelola User">
        <Button
          className="btn-success"
          onClick={() => navigate("/admin/kelola-user/add-user")}
        >
          Tambah
        </Button>
      </LabelPages>
    </ContainerAdmin>
  );
}
