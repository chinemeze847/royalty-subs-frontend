import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IoPersonOutline } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import PaginationItemComponent from "~/components/list/pagination-item.component";
import UserItemComponent from "~/components/list/user-item.component";
import EmptyListComponent from "~/components/utils/empty-list.component";
import type PaginationDto from "~/models/pagination-dto.model";
import type User from "~/models/user.model";
import { getSession } from "~/server/session.server";
import UserApiService from "~/services/user-api.service";

type LoaderData = {
  users: User[];
  pagination: PaginationDto;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const before = url.searchParams.get("before");
  const after = url.searchParams.get("after");

  const session = await getSession(request.headers.get('Cookie'));

  const res = await UserApiService.read(before, after, session.get('accessToken'));

  return json<LoaderData>({ 
    users: res.data, 
    pagination: res.metaData?.pagination as PaginationDto 
  });
}

export default function Users() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Users" />

      <section className="table-container">
      
        {
          data.users.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border p-dimen-xs text-left">ID</th>
                  <th className="border p-dimen-xs text-left">Full name</th>
                  <th className="border p-dimen-xs text-left">Email</th>
                  <th className="border p-dimen-xs text-left">Phone number</th>
                  <th className="border p-dimen-xs text-left">Status</th>
                  <th className="border p-dimen-xs text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.users.map(item => (
                    <UserItemComponent key={item.id} user={item} />
                  ))
                }
              </tbody>
              <PaginationItemComponent pagination={data.pagination} />
            </table>
          ) : (
            <EmptyListComponent Icon={IoPersonOutline} text="No user" /> 
          )
        }

      </section>
    </div>
  );
}
