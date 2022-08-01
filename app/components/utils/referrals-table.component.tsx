import { IoPersonOutline } from "react-icons/io5";
import PaginationItemComponent from "~/components/list/pagination-item.component";
import ReferralItemComponent from "~/components/list/referral-item.component";
import EmptyListComponent from "~/components/utils/empty-list.component";
import type PaginationDto from "~/models/pagination-dto.model";
import type User from "~/models/user.model";

export type LoaderData = {
  users: User[];
  pagination: PaginationDto;
};

export default function ReferralsTableComponent({ data }: { data: LoaderData }) {
  return (
    <section className="table-container">
      
      {
        data.users.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border p-dimen-xs text-left">Full name</th>
                <th className="border p-dimen-xs text-left">Phone number</th>
                <th className="border p-dimen-xs text-left">Joined on</th>
              </tr>
            </thead>
            <tbody>
              {
                data.users.map(item => (
                  <ReferralItemComponent key={item.id} user={item} />
                ))
              }
            </tbody>
            <PaginationItemComponent pagination={data.pagination} />
          </table>
        ) : (
          <EmptyListComponent Icon={IoPersonOutline} text="No referrals" /> 
        )
      }

    </section>
  );
}
