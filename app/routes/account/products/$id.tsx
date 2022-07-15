import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoCubeOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import ProductUnitItemComponent from '~/components/list/product-unit-item.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import TabComponent from '~/components/utils/tab.component';
import { type LoaderData, productProfileLoader } from '~/server/product-profile.server';

export const loader: LoaderFunction = ({ request, params }) => productProfileLoader(request, params);

export default function ProductProfile() {
  const { product, brands, activeBrand } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Product" />

      <section className="mb-dimen-lg">

        <dl>
          <ProfileDLItemComponent 
            heading="Name" 
            body={`
              ${product.name}
              (${product.available ? 'Available' : 'Not available'})
            `} 
          />
        </dl>

      </section>

      <section>
        <TabComponent 
          items={brands} 
          activeItem={activeBrand} 
        />

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
                    product.productUnits
                      .filter(item => item.brand.id === activeBrand)
                      .map(item => (
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
