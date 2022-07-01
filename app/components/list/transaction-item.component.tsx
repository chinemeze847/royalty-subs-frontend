import { Link } from '@remix-run/react';
import useMoneyFormat from '~/hooks/money-format.hook';
import type Transaction from '~/models/transaction.model';

export default function TransactionItemComponent(
  { transaction }: { transaction: Transaction}
) {
  const money = useMoneyFormat();

  return (
    <tr className="border">
      <td className="border p-dimen-xs">{ transaction.reference }</td>
      <td className="border p-dimen-xs">NGN { money(transaction.amount) }</td>
      <td className="border p-dimen-xs">{ transaction.type }</td>
      <td className="border p-dimen-xs">{ transaction.status }</td>
      <td className="border p-dimen-xs">
        <Link 
          to={String(transaction.id)} 
          className="table-button"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
