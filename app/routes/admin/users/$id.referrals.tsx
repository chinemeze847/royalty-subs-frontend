import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";
import ProfileDLItemComponent from "~/components/list/profile-dl-item.component";
import 
  ReferralsTableComponent, 
  { type LoaderData as ReferralsLoaderData } 
from '~/components/utils/referrals-table.component';
import type User from "~/models/user.model";
import { getSession } from "~/server/session.server";
import UserApiService from "~/services/user-api.service";

type LoaderData = { user: User; } & ReferralsLoaderData;

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");

  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const userId = params.id as string;

  const [userResponse, referralsResponse] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    UserApiService.readReferrals(
      userId, 
      page, 
      accessToken,
    ),
  ]);

  if (userResponse.statusCode !== 200) {
    throw new Response('Error', { status: userResponse.statusCode });
  } else if (referralsResponse.statusCode !== 200) {
    throw new Response('Error', { status: referralsResponse.statusCode });
  }

  return json<LoaderData>({ 
    user: userResponse.data, 
    users: referralsResponse.data,
    pagination: referralsResponse.metaData?.pagination as any,
  });
}

export default function UserReferrals() {
  const { user, ...referrals } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="User referrals"/>

      <section>

        <dl>
          <ProfileDLItemComponent heading="First name" body={user.firstName} />
          <ProfileDLItemComponent heading="Last name" body={user.lastName} />
          {
            user.referral !== null && (
              <ProfileDLItemComponent 
                heading="Referred by" 
                body={`${user.referral.firstName} ${user.referral.lastName} (${user.referral.phoneNumber})`} 
              />
            )
          }
        </dl>

      </section>

      <ReferralsTableComponent data={referrals} />

    </div>
  );
}
