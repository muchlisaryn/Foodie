import { useParams } from "react-router-dom";
import { Navbar } from "../../component";
import { formatRupiah } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInvoice } from "../../features/OrderSlice";
import { getCart } from "../../features/CartSlice";

export default function Invoice() {
  const invoice = useSelector((state) => state?.order.invoice);
  const dispatch = useDispatch();
  const { order_id } = useParams();

  //request data cart & invoice to server
  useEffect(() => {
    dispatch(getCart());
    dispatch(getInvoice({ order_id }));
  }, [dispatch, order_id]);

  return (
    <Navbar>
      <div>
        <div className="d-flex">
          <div className="fw-bold fs-4">Invoice</div>
        </div>

        <div className="mt-2 bg-warning bg-opacity-10 border border-warning p-2 rounded text-warning text-center">
          {invoice?.payment_status}
        </div>

        <div className="my-3">
          <div className="fw-bold ">Info Pengiriman</div>
          <div className="d-flex mt-2">
            <div>Alamat </div>
            <div className="ms-3">
              <div>
                <span className="fw-bold me-1">
                  {invoice?.delivery_address?.name}
                </span>
                ({invoice?.delivery_address?.no_telephone})
              </div>
              <div>{invoice?.delivery_address?.detail}</div>
            </div>
          </div>
        </div>

        <table class="table teble-sm  table-bordered">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Qty</th>
              <th scope="col " className="text-end">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice?.order_items?.map((item, index) => (
              <tr key={++index}>
                <td>{item?.name}</td>
                <td>{item?.qty}</td>
                <td className="text-end">{formatRupiah(item?.price)}</td>
              </tr>
            ))}
            <tr>
              <td colspan="2">
                Total Harga ({invoice.order_items?.length} Product){" "}
              </td>
              <td className="text-end fw-bold">
                {formatRupiah(invoice?.sub_total)}
              </td>
            </tr>
            <tr>
              <td colspan="2">Ongkir</td>
              <td className="text-end fw-bold">
                {formatRupiah(invoice?.delivery_fee)}
              </td>
            </tr>
            <tr className="table-active">
              <td colspan="2" className="fw-bold">
                Total
              </td>
              <td className="text-end fw-bold">
                {formatRupiah(invoice?.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Navbar>
  );
}
