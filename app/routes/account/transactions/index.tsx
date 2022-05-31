import { Link } from "@remix-run/react";

const TransactionItem = () => {
  return (
    <tr className="border">
      <td className="border p-dimen-xs">RYL_83JJDS883</td>
      <td className="border p-dimen-xs">NGN 200.00</td>
      <td className="border p-dimen-xs">Deposit</td>
      <td className="border p-dimen-xs">Approved</td>
      <td className="border p-dimen-xs">
        <Link 
          to="RYL_83JJDS883" 
          className="block w-fit text-color-on-primary py-dimen-xs px-dimen-lg font-bold rounded-lg bg-color-primary hover:bg-color-primary-variant"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default function TransactionsIndex() {
  return (
    <section className="table-container">
      
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border p-dimen-xs text-left">Reference</th>
            <th className="border p-dimen-xs text-left">Amount</th>
            <th className="border p-dimen-xs text-left">Type</th>
            <th className="border p-dimen-xs text-left">Status</th>
            <th className="border p-dimen-xs text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
        </tbody>
      </table>

    </section>
  );
}
