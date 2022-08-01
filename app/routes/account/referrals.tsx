import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import ReferralLinkInputComponent from '~/components/form/referral-link-input.component';
import AccountH2Component from '~/components/header/account-h2.component';
import 
  ReferralsTableComponent, 
  { type LoaderData as ReferralsLoaderData } 
from '~/components/utils/referrals-table.component';
import type PaginationDto from '~/models/pagination-dto.model';
import type User from '~/models/user.model';
import { getSession } from '~/server/session.server';
import UserApiService from '~/services/user-api.service';

type LoaderData = {
  referralLink: string;
  referrer: User | null;
} & ReferralsLoaderData;

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

      <ReferralsTableComponent data={data} />
      
    </div>
  );
}
