import { Button, LabelPages } from "../../../component";
import ContainerAdmin from "../../../component/container/ContainerAdmin";

export default function KelolaProduct() {
  return (
    <ContainerAdmin>
      <LabelPages label="Kelola User">
        <Button className="btn-success">Tambah</Button>
      </LabelPages>
    </ContainerAdmin>
  );
}
