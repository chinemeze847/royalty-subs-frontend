import { IoCartOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import PaginationItemComponent from '~/components/list/pagination-item.component';
import TransactionItemComponent from '~/components/list/transaction-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import type PaginationDto from '~/models/pagination-dto.model';
import type Transaction from '~/models/transaction.model';

export type LoaderData = {
  transactions: Transaction[];
  pagination: PaginationDto;
}

export const TransactionsTableComponent = ({ data }: { data: LoaderData }) => {
  return (
    <section className="table-container">
      
      {
        data.transactions.length > 0 ? (
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
              {
                data.transactions.map(item => (
                  <TransactionItemComponent key={item.id} transaction={item} />
                ))
              }
            </tbody>
            <PaginationItemComponent pagination={data.pagination} />
          </table>
        ) : (
          <EmptyListComponent Icon={IoCartOutline} text="No transaction" /> 
        )
      }

    </section>
  );
}


export default function TransactionsTableContainerComponent({ data }: { data: LoaderData }) {
  return (
    <div className="container">

      <AccountH2Component text="Transactions" />

      <TransactionsTableComponent data={data} />
    </div>
  );
}
