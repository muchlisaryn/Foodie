import { useState } from "react";
import { Button, Input, Navbar } from "../../component";
import "./style.scss";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, login } from "../../features/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export default function Login() {
  const loading = useSelector((state) => state?.auth?.pending);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //effect disable button sign
  useEffect(() => {
    if (email === "" || password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disabled, email, password]);

  //function sign
  const auth = async (e) => {
    e.preventDefault();

    const auth = await dispatch(login({ email, password }));
    const authResult = await unwrapResult(auth);

    if (authResult.error) {
      setErrorMessage(authResult.message);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: authResult.message,
      // });
    }
    if (authResult.token) {
      const action = await dispatch(getToken(authResult?.token));
      const result = await unwrapResult(action);
      console.log(result);
      if (result.role) {
        if (result.role === "admin") {
          navigate("/admin/kelola-product");
        } else {
          navigate("/");
        }
        Swal.fire("Success!", "Login Success", "success");
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
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100 w-full">
        <div className="login border rounded">
          <div className="w-100 h-100 d-flex flex-column justify-content-between p-3">
            <div className="title d-flex flex-column align-items-center justify-content-between fw-bold">
              <div className="h-100 d-flex align-items-center">SIGN</div>
              {errorMessage.length > 0 && (
                <div className="bg-danger p-2 text-light rounded w-100">
                  {errorMessage}
                </div>
              )}
            </div>

            <div className="field d-flex flex-column justify-content-between align-items-center ">
              <div className="w-100">
                <div className="mt-2">Email</div>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="w-100">
                <div>Password</div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="button-primary"
                className="w-full "
                disabled={disabled}
                onClick={auth}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>

            <div className="register d-flex align-items-center justify-content-center">
              Belum punya akun Foodie?{" "}
              <NavLink className="ms-1" to="/register">
                Daftar
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
