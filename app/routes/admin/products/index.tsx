import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoCubeOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import ProductItemComponent from '~/components/list/product-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import type Product from '~/models/product.model';
import ProductApiService from '~/services/product-api.service';

type LoaderData = {
  products: Product[];
};

export const loader: LoaderFunction = async () => {
  const response = await ProductApiService.read();

  return json<LoaderData>({ products: response.data });
};

export default function ProductsIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Products" />

      <section className="table-container">

        {
          data.products.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border p-dimen-xs text-left">ID</th>
                  <th className="border p-dimen-xs text-left">Name</th>
                  <th className="border p-dimen-xs text-left">Available</th>
                  <th className="border p-dimen-xs text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.products.map(item => (
                    <ProductItemComponent key={item.id} product={item} />
                  ))
                }
              </tbody>
            </table>
          ) : (
            <EmptyListComponent Icon={IoCubeOutline} text="No product" /> 
          )
        }

      </section>
    </div>
  );
}
