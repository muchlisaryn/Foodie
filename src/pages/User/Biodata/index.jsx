import { useEffect } from "react";
import { Widgets, Container } from "../../../component";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../../features/UserSlice";

export default function Biodata() {
  const data = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const params = new URLSearchParams(document?.location?.search);
  const id = params.get("id");

  //request get data user by id to server
  useEffect(() => {
    dispatch(getOneUser({ id }));
  }, [dispatch, id]);

  return (
    <Container>
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
    </Container>
  );
}
