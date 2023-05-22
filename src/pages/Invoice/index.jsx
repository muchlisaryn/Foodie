import { useLocation } from "react-router-dom";
import { Navbar } from "../../component";
import { formatRupiah } from "../../utils";

export default function Invoice() {
  const location = useLocation();
  const invoice = location.state;

  const totalOrder = invoice?.order_items?.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <Navbar>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-bold fs-4">Invoice</div>
          <div>Date : </div>
        </div>

        <div className="mt-2 bg-warning bg-opacity-10 border border-warning p-2 rounded text-warning text-center">
          {invoice?.status}
        </div>

        <div className="d-flex"></div>

        <table class="table teble-sm mt-3 table-bordered">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Qty</th>
              <th scope="col " className="text-end">
                price
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice?.order_items?.map((item) => (
              <tr>
                <td>{item?.name}</td>
                <td>{item?.qty}</td>
                <td className="text-end">{formatRupiah(item?.price)}</td>
              </tr>
            ))}
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
              <td className="text-end fw-bold">{formatRupiah(totalOrder)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Navbar>
  );
}
