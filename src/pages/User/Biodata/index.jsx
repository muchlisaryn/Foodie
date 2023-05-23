import { useEffect } from "react";
import { Widgets, Navbar } from "../../../component";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../../features/UserSlice";

export default function Biodata() {
  const data = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const params = new URLSearchParams(document?.location?.search);
  const id = params.get("id");

  console.log(data);

  useEffect(() => {
    dispatch(getOneUser({ id }));
  }, [dispatch, id]);

  return (
    <Navbar>
      <Widgets>
        <div className="fw-bold">Biodata</div>
        <div className="mt-2">
          <div className="d-flex mb-2">
            <div style={{ minWidth: 150 }}>Name</div>
            <div>{data?.full_name}</div>
          </div>
          <div className="d-flex mb-2">
            <div style={{ minWidth: 150 }}>Email</div>
            <div>{data?.email}</div>
          </div>
        </div>
      </Widgets>
    </Navbar>
  );
}
