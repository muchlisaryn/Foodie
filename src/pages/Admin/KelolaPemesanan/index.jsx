import { useDispatch, useSelector } from "react-redux";
import { Button, LabelPages, Sidebar } from "../../../component";
import { useEffect } from "react";
import { deleteOrder, getAllOrders } from "../../../features/OrderSlice";
import { Skeleton } from "../../../component";
import { formatRupiah } from "../../../utils";

export default function KelolaPemesanan() {
  const data = useSelector((state) => state.order.allOrders);
  const dispatch = useDispatch();
  const loading = false;

  const deleteData = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Sidebar>
      <LabelPages label="Kelola Pemesanan">
        <Button className="btn-success">Tambah</Button>
      </LabelPages>
      <table className="table  table-borderless border">
        <thead>
          <tr>
            <th scope="col " className="w-25 text-center">
              {loading ? <Skeleton height={22} /> : "No Order"}
            </th>
            <th scope="col">{loading ? <Skeleton height={22} /> : "User"}</th>
            <th scope="col" className="w-25">
              {loading ? <Skeleton height={22} /> : "Total"}
            </th>
            <th scope="col" className="text-center">
              {loading ? <Skeleton height={22} /> : "Action"}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            <>
              {data?.map((list, index) => (
                <tr key={++index} className="product">
                  <td className="fw-bold">#{list?.id}</td>
                  <td className="align-middle">{list?.user?.first_name}</td>
                  <td className="align-middle">{formatRupiah(list?.total)}</td>
                  <td className=" align-middle">
                    <div className="d-flex justify-content-center">
                      {loading ? (
                        <Skeleton height={22} />
                      ) : (
                        <Button className="btn-sm bg-warning">Confirm</Button>
                      )}

                      {loading ? (
                        <Skeleton height={22} />
                      ) : (
                        <Button
                          className="btn-sm bg-danger text-light ms-2"
                          onClick={() => deleteData(list?._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                {loading ? <Skeleton height={22} /> : "Data Not Found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Sidebar>
  );
}
