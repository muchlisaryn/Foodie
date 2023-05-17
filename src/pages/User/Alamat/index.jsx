import { useNavigate } from "react-router-dom";
import { Button, ContainerUser } from "../../../component";
import "./style.scss";

export default function Alamat() {
  const navigate = useNavigate();

  return (
    <ContainerUser>
      <Button
        type="btn-add"
        className="btn-sm"
        onClick={() => navigate("/user/alamat/add-alamat")}
      >
        Tambah Alamat
      </Button>
      <div className="mt-2">
        <div className="border rounded p-3">
          <div className="d-flex justify-content-between">
            <div className="fw-bold">Muchlis</div>
          </div>
          <div>08123213123</div>
          <div className="text-break">
            sajssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
          </div>
          <div className="d-flex mt-2">
            <Button type="custom" className="btn-change">
              Ubah
            </Button>
            <div className="border-end mx-2"></div>
            <Button type="custom" className="btn-change">
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </ContainerUser>
  );
}
