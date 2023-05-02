import { useState } from "react";
import { Button, Input, LabelPages, Select } from "../../../../component";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import "./style.scss";

export default function AddUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectRole, setSelectRole] = useState("");

  const tambahUser = () => {
    if (
      fullName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Semua form wajib diisi");
    } else if (password !== confirmPassword) {
      alert("Confirm password tidak sama");
    }
  };

  const role = [
    {
      id: 1,
      name: "User",
    },
    {
      id: 2,
      name: "Admin",
    },
  ];

  return (
    <ContainerAdmin>
      <LabelPages type="back" label="Add User" to="/admin/kelola-user" />
      <div className="add-user p-3 border rounded">
        <div className="form-input d-flex align-items-center pb-2">
          <div className="label">Full Name</div>
          <div className="me-2">:</div>
          <Input
            type="text"
            onChage={(e) => setFullName(e?.target?.value)}
            value={fullName}
            className="form-control-sm"
          />
        </div>
        <div className="form-input d-flex align-items-center pb-2 ">
          <div className="label">Email</div>
          <div className="me-2">:</div>
          <Input
            type="text"
            onChage={(e) => setEmail(e?.target?.value)}
            value={email}
            className="form-control-sm"
          />
        </div>
        <div className="form-input d-flex align-items-center pb-2 ">
          <div className="label">Role</div>
          <div className="me-2">:</div>
          <Select
            data={role}
            label="Select Role"
            className="form-select-sm"
            onChange={(e) => setSelectRole(e.target.value)}
            value={selectRole}
          />
        </div>
        <div className="form-input d-flex align-items-center pb-2 ">
          <div className="label">Password</div>
          <div className="me-2">:</div>
          <Input
            type="password"
            onChage={(e) => setPassword(e?.target?.value)}
            value={password}
            className="form-control-sm"
          />
        </div>
        <div className="form-input d-flex align-items-center pb-2 ">
          <div className="label">Confirm Password</div>
          <div className="me-2">:</div>
          <Input
            type="password"
            onChage={(e) => setConfirmPassword(e?.target?.value)}
            value={confirmPassword}
            className="form-control-sm"
          />
        </div>
        <div className="d-flex justify-content-end">
          <div>
            <Button className="bg-success text-light" onClick={tambahUser}>
              Tambah User
            </Button>
          </div>
        </div>
      </div>
    </ContainerAdmin>
  );
}
