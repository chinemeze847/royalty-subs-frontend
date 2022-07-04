import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoCubeOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import ProductUnitItemComponent from '~/components/list/product-unit-item.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import type Product from '~/models/product.model';
import ProductApiService from '~/services/product-api.service';

type LoaderData = { product: Product; };

export const loader: LoaderFunction = async ({ params }) => {
  const [response, unitsResponse] = await Promise.all([
    ProductApiService.readOne(params.id as string),
    ProductApiService.readProductUnits(params.id as string),
  ]);

  if (response.statusCode !== 200) {
    throw new Response('Error', { status: response.statusCode });
  } else if (unitsResponse.statusCode !== 200) {
    throw new Response('Error', { status: unitsResponse.statusCode });
  }

  const product = response.data;

  product.productUnits = unitsResponse.data;

  return json<LoaderData>({ product });
};

export default function ProductProfile() {
  const { product } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Product" />

      <section className="mb-dimen-lg">

        <dl>
          <ProfileDLItemComponent heading="Name" body={product.name} />
          <ProfileDLItemComponent heading="Available" body={String(product.available)} />
        </dl>

      </section>

      <section>
        <div className="table-container">
          {
            product.productUnits.length > 0 ? (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="border p-dimen-xs text-left">Company</th>
                    <th className="border p-dimen-xs text-left">Name</th>
                    <th className="border p-dimen-xs text-left">Price</th>
                    <th className="border p-dimen-xs text-left">Duration</th>
                    <th className="border p-dimen-xs text-left">Available</th>
                    <th className="border p-dimen-xs text-left">Type</th>
                    <th className="border p-dimen-xs text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    product.productUnits.map(item => (
                      <ProductUnitItemComponent 
                        key={item.id} 
                        productUnit={item} 
                        actionButton={{ text: 'Buy', to: `/account/product-unit/${item.id}`  }} 
                      />
                    ))
                  }
                </tbody>
              </table>
            ) : (
              <EmptyListComponent Icon={IoCubeOutline} text="No product unit" /> 
            )
          }
        </div>
      </section>

    </div>
  );
}
