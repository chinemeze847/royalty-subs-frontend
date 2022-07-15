import { type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IoCubeOutline } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import ProductUnitItemComponent from "~/components/list/product-unit-item.component";
import ProfileDLItemComponent from "~/components/list/profile-dl-item.component";
import EmptyListComponent from "~/components/utils/empty-list.component";
import TabComponent from "~/components/utils/tab.component";
import useDateFormat from "~/hooks/date-format.hook";
import { type LoaderData, productProfileLoader } from "~/server/product-profile.server";

export const loader: LoaderFunction = ({ request, params }) => productProfileLoader(request, params);

export default function ProductProfile () {
  const data = useLoaderData<LoaderData>();

  const dateFormat = useDateFormat();

  return (
    <div className="container">

      <AccountH2Component 
        text="Product" 
        links={[
          { text: 'Edit', to: 'edit' },
          { text: 'Add product unit', to: 'product-unit' },
        ]} 
      />

      <section className="mb-dimen-lg">

        <dl>
          <ProfileDLItemComponent heading="Name" body={data.product.name} />
          <ProfileDLItemComponent heading="Available" body={String(data.product.available)} />
          <ProfileDLItemComponent heading="Date" body={dateFormat(data.product.createdAt)} />
          <ProfileDLItemComponent heading="Description" body={data.product.description} />
        </dl>

      </section>

      <section>
        <TabComponent 
          items={data.brands} 
          activeItem={data.activeBrand} 
        />

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
                    data.product.productUnits
                      .filter(item => item.brand.id === data.activeBrand)
                      .map(item => (
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
