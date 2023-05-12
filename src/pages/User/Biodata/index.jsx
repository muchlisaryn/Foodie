import { ContainerUser } from "../../../component";
import "./style.scss";

export default function Biodata() {
  const FormBiodata = ({ title, value, onClick }) => {
    return (
      <div className="d-flex mb-2">
        <div className="key-bio">{title}</div>
        <div className="value">
          {value}
          <span className="btn-ubah ms-1" onClick={onClick}>
            ubah
          </span>
        </div>
      </div>
    );
  };

  return (
    <ContainerUser>
      <div className="biodata mt-2">
        <div className="photo-profile">
          <img
            src="https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/01/12/1119792131.jpg"
            alt="foto profile"
          />
          <input className="select-photo" type="file" />
        </div>
        <div className="w-75 bio">
          <div className="fw-bold mb-2">Ubah Biodata Diri</div>
          <FormBiodata title="First Name" value="Muchlis" />
          <FormBiodata title="Last Name" value="Aryana" />
          <FormBiodata title="Email" value="Muchlisar68@gmail.com" />
          <FormBiodata title="Nomor Telephone" value="081310750099" />
        </div>
      </div>
    </ContainerUser>
  );
}
