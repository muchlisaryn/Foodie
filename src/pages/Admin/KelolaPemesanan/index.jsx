import { Button, LabelPages, Sidebar } from "../../../component";

export default function KelolaPemesanan() {
  return (
    <Sidebar>
      <LabelPages label="Kelola Pemesanan">
        <Button className="btn-success">Tambah</Button>
      </LabelPages>
    </Sidebar>
  );
}
