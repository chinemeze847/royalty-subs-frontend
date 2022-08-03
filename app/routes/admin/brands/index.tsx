import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoBusinessOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import BrandItemComponent from '~/components/list/brand-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import type Brand from '~/models/brand.model';
import { getSession } from '~/server/session.server';
import BrandApiService from '~/services/brand-api.service';

type LoaderData = {
  brands: Brand[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const res = await BrandApiService.read(session.get('accessToken'));

  if (res.statusCode !== 200) {
    throw new Response('Error', { status: res.statusCode });
  }

  return json<LoaderData>({ brands: res.data });
}

export default function Brands() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component  text="Brands" links={[{ text: 'Add brand', to: 'create' }]} />

      <section className="table-container">

        {
          data.brands.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border p-dimen-xs text-left">ID</th>
                  <th className="border p-dimen-xs text-left">Name</th>
                  <th className="border p-dimen-xs text-left">Photo</th>
                  <th className="border p-dimen-xs text-left">API code</th>
                  <th className="border p-dimen-xs text-left">Date</th>
                  <th className="border p-dimen-xs text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.brands.map(item => (
                    <BrandItemComponent key={item.id} brand={item} />
                  ))
                }
              </tbody>
            </table>
          ) : (
            <EmptyListComponent Icon={IoBusinessOutline} text="No brand" /> 
          )
        }
      </section>
    </div>
  );
}
