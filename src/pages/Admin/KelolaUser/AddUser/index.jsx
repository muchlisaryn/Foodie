import { useState } from "react";
import { LabelPages } from "../../../../component";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import "./style.scss";
import Input from "../../../../component/atoms/Input";

export default function AddUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const FieldInput = ({ label, type, onChage, value }) => {
    return (
      <div className="form-input d-flex align-items-center bg-danger">
        <div className="label">Full Name</div>
        <div className="me-2">:</div>
        <Input
          type={type}
          onChage={onChage}
          value={value}
          className="form-control-sm"
        />
      </div>
    );
  };

  return (
    <ContainerAdmin>
      <LabelPages type="back" label="Add User" to="/admin/kelola-user" />
      <div className="add-user p-3 border rounded">
        <FieldInput />
        <div className="">Full Name</div>
        <div className="">Email</div>
        <div className="">Password</div>
        <div className="">Confirm Password</div>
      </div>
    </ContainerAdmin>
  );
}
