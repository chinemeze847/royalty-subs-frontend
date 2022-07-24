import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoPersonOutline } from 'react-icons/io5';
import ReferralLinkInputComponent from '~/components/form/referral-link-input.component';
import AccountH2Component from '~/components/header/account-h2.component';
import PaginationItemComponent from '~/components/list/pagination-item.component';
import ReferralItemComponent from '~/components/list/referral-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import type PaginationDto from '~/models/pagination-dto.model';
import type User from '~/models/user.model';
import { getSession } from '~/server/session.server';
import UserApiService from '~/services/user-api.service';

type LoaderData = {
  users: User[];
  referralLink: string;
  referrer: User | null;
  pagination: PaginationDto;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");

  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [userRes, referralsRes] = await Promise.all([
    UserApiService.readOne(
      userId, 
      accessToken,
    ),
    UserApiService.readReferrals(
      userId, 
      page, 
      accessToken,
    ),
  ]);

  const referralLink = `${url.protocol}//${url.host}?ref=${userId}`;

  return json<LoaderData>({ 
    referralLink,
    users: referralsRes.data, 
    referrer: userRes.data.referral,
    pagination: referralsRes.metaData?.pagination as PaginationDto 
  });
}

export default function Referrals() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Referrals" />

      <div className="mb-dimen-xl shadow shadow-color-primary p-dimen-sm rounded-lg">
        <h3 className="font-bold mb-dimen-xs">
          Join our referral program by referring people to Royaltysubs and earn a bonus of 1% of their first funding.
        </h3>
        <ReferralLinkInputComponent link={data.referralLink} />
        {
          data.referrer !== null && (
            <div className="flex gap-dimen-xs bg-color-background rounded-lg p-dimen-xs">
              <h3 className="font-bold mb-dimen-xxs">Referred by:</h3>
              <div>{data.referrer.firstName} {data.referrer.lastName} ({data.referrer.phoneNumber})</div>
            </div>
          )
        }
      </div>

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
    </div>
  );
}
