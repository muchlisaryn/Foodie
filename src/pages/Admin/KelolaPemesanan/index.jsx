import { Button, LabelPages } from "../../../component";
import ContainerAdmin from "../../../component/container/ContainerAdmin";

export default function KelolaPemesanan() {
  return (
    <ContainerAdmin>
      <LabelPages label="Kelola Pemesanan">
        <Button className="btn-success">Tambah</Button>
      </LabelPages>
    </ContainerAdmin>
  );
}
