import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";
import ProductUnitItemComponent from "~/components/list/product-unit-item.component";
import ProfileDLItemComponent from "~/components/list/profile-dl-item.component";
import useDateFormat from "~/hooks/date-format.hook";
import type Product from "~/models/product.model";
import ProductApiService from "~/services/product-api.service";

type LoaderData = { product: Product; };

export const loader: LoaderFunction = async ({ params }) => {
  const [response, unitsResponse] = await Promise.all([
    ProductApiService.readOne(params.id as string),
    ProductApiService.readProductUnits(params.id as string),
  ]);

  const product = response.data;

  product.productUnits = unitsResponse.data;

  return json<LoaderData>({ product });
};

export default function ProductProfile () {
  const data = useLoaderData<LoaderData>();

  const dateFormat = useDateFormat();

  return (
    <div className="container">

      <AccountH2Component text="Product" links={[{ text: 'Edit', to: 'edit' }]} />

      <section className="mb-dimen-lg">

        <dl>
          <ProfileDLItemComponent heading="Name" body={data.product.name} />
          <ProfileDLItemComponent heading="Available" body={String(data.product.available)} />
          <ProfileDLItemComponent heading="Date" body={dateFormat(data.product.createdAt)} />
          <ProfileDLItemComponent heading="Description" body={data.product.description} />
        </dl>

      </section>

      <section>
        <h4 className="font-bold">Product units</h4>
        <div className="table-container">
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
                data.product.productUnits.map(item => (
                  <ProductUnitItemComponent key={item.id} productUnit={item} />
                ))
              }
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
