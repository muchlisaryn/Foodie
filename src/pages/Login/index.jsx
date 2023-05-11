import { useState } from "react";
import { Button, Input } from "../../component";
import "./style.scss";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, login } from "../../features/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (email === "" || password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disabled, email, password]);

  const auth = async (e) => {
    e.preventDefault();

    const auth = await dispatch(login({ email, password }));
    const authResult = await unwrapResult(auth);
    console.log("===> ", authResult);
    if (authResult.token) {
      const action = await dispatch(getToken(authResult?.token));
      const result = await unwrapResult(action);
      if (result.role) {
        if (result.role === "admin") {
          Swal.fire("Success!", `${result.message}`, "success");
          navigate("/admin/kelola-product");
        } else {
          Swal.fire("Success!", `${result.message}`, "success");
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login Gagal",
        });
      }
    }
  };

  return (
    <div className="w-full vh-100 d-flex align-items-center justify-content-center">
      <div className="login h-75 p-3 border rounded ">
        <div className="h-100 ">
          <div className="h-25 d-flex align-items-center justify-content-center">
            Masuk
          </div>
          <div className="d-flex h-50 align-items-center ">
            <div className="w-100">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="button-primary"
                className="w-full mt-4"
                disabled={disabled}
                onClick={auth}
              >
                Login
              </Button>
            </div>
          </div>

          <div className="desc h-25 d-flex align-items-end justify-content-center">
            Belum punya akun Foodie?{" "}
            <NavLink className="ms-1" to="/register">
              Daftar
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
