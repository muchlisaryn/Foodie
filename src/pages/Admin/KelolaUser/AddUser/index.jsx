import { useState } from "react";
import { Button, Input, LabelPages, Select } from "../../../../component";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import "./style.scss";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../features/UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectRole, setSelectRole] = useState("user");

  const register = async ({ first_name, last_name, email, password, role }) => {
    try {
      const actionResult = await dispatch(
        registerUser({ first_name, last_name, email, password, role })
      );
      const result = unwrapResult(actionResult);
      console.log(result);
      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        });
      } else {
        navigate("/admin/kelola-user");
        Swal.fire("Success!", "Berhasil Menambahkan User", "success");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const tambahUser = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Semua form wajib diisi");
    } else if (password !== confirmPassword) {
      alert("Confirm password tidak sama");
    } else {
      register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: selectRole,
      });
    }
  };

  const role = [
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
  ];

  return (
    <ContainerAdmin>
      <LabelPages type="back" label="Add User" to="/admin/kelola-user" />
      <div className="add-user p-3 border rounded">
        <div className="form-input d-flex align-items-center pb-2">
          <div className="label">First Name</div>
          <div className="me-2">:</div>
          <Input
            type="text"
            onChage={(e) => setFirstName(e?.target?.value)}
            value={firstName}
            className="form-control-sm"
          />
        </div>
        <div className="form-input d-flex align-items-center pb-2">
          <div className="label">Last Name</div>
          <div className="me-2">:</div>
          <Input
            type="text"
            onChage={(e) => setLastName(e?.target?.value)}
            value={lastName}
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
