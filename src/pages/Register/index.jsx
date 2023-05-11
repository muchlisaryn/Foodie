import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input } from "../../component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { registerUser } from "../../features/UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import "./style.scss";

export default function Register() {
  const [disabled, setDisabled] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async () => {
    if (firstName?.length <= 3 || firstName?.length > 30) {
      alert("Panjang Karakter First Name 3 - 30 Karakter");
    } else if (lastName?.length <= 3 || lastName?.length > 30) {
      alert("Panjang Karakter Last Name 3 - 30 Karakter");
    } else {
      try {
        const actionResult = await dispatch(
          registerUser({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          })
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
          navigate("/login");
          Swal.fire(
            "Success!",
            "Berhasil Registrasi Silahkan login",
            "success"
          );
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal Registrasi",
        });
      }
    }
  };

  useEffect(() => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, email, password, disabled]);

  return (
    <div className="register w-full vh-100 d-flex align-items-center justify-content-center">
      <div className="box h-75 p-3 border rounded ">
        <div className="h-100 ">
          <div className="title d-flex align-items-center justify-content-center">
            Register
          </div>
          <div className="content d-flex align-items-center">
            <div className="w-100">
              <div className="d-flex justify-content-between mb-2">
                <div className="me-2">
                  <div>First Name</div>
                  <Input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div>
                  <div>Last Name</div>
                  <Input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div>Email</div>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <div>Password</div>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <Button
                type="button-primary"
                className="w-full mt-4"
                onClick={register}
                disabled={disabled}
              >
                Register
              </Button>
            </div>
          </div>

          <div className="login d-flex align-items-end justify-content-center">
            Sudah Punya Akun?{" "}
            <NavLink className="ms-1" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
