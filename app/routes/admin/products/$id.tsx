import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { IoCubeOutline } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import ProductUnitItemComponent from "~/components/list/product-unit-item.component";
import ProfileDLItemComponent from "~/components/list/profile-dl-item.component";
import EmptyListComponent from "~/components/utils/empty-list.component";
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
        <div className="flex gap-dimen-sm">
          <h4 className="font-bold text-lg flex-grow">Product units</h4>
          <Link 
            to="product-unit" 
            className="bg-color-primary px-dimen-sm py-dimen-xxs rounded-lg text-color-on-primary"
          >
            Add product unit
          </Link>
        </div>
        <div className="table-container">
          {
            data.product.productUnits.length > 0 ? (
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
            ) : (
              <EmptyListComponent Icon={IoCubeOutline} text="No product unit" /> 
            )
          }
        </div>
      </section>

    </div>
  );
}
