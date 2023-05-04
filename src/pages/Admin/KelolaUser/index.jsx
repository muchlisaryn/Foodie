import { useNavigate } from "react-router-dom";
import { Button, LabelPages, Skeleton } from "../../../component";
import ContainerAdmin from "../../../component/container/ContainerAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUser } from "../../../features/UserSlice";

export default function KelolaUser() {
  const dispatch = useDispatch();
  const loading = useSelector((list) => list.users.pending);
  const data = useSelector((list) => list.users.users);
  const navigate = useNavigate();

  const deleteData = (id) => {
    dispatch(deleteUser({ id }));
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <ContainerAdmin>
      <LabelPages label="Kelola User">
        <Button
          className="btn-success"
          onClick={() => navigate("/admin/kelola-user/add-user")}
        >
          Tambah
        </Button>
      </LabelPages>
      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col">
              {loading ? <Skeleton height={22} width={20} /> : "No"}
            </th>
            <th scope="col " className="w-25">
              {loading ? <Skeleton height={22} /> : "Name"}
            </th>
            <th scope="col" className="w-50">
              {loading ? <Skeleton height={22} /> : "Email"}
            </th>
            <th scope="col" className="w-25">
              {loading ? <Skeleton height={22} /> : "Role"}
            </th>
            <th scope="col" className="text-center">
              {loading ? <Skeleton height={22} /> : "Action"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((list, index) => (
            <tr key={++index}>
              <th scope="row">
                {loading ? <Skeleton height={22} width={20} /> : ++index}
              </th>
              <td className="w-25">
                {loading ? <Skeleton height={22} /> : list?.full_name}
              </td>
              <td className="w-50">
                {loading ? <Skeleton height={22} /> : list?.email}
              </td>
              <td className="w-25">
                {loading ? <Skeleton height={22} /> : list?.role}
              </td>
              <td className="d-flex">
                <>
                  {loading ? (
                    <Skeleton width={45} height={22} className="ms-2" />
                  ) : (
                    <Button
                      className="btn-sm bg-danger text-light ms-2"
                      onClick={() => deleteData(list?._id)}
                    >
                      Delete
                    </Button>
                  )}
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContainerAdmin>
  );
}
