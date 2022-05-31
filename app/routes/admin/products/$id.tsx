import { Link } from "@remix-run/react";
import { IoCube } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";

const PricingItem = () => {
  return (
    <tr className="border">
      <td className="border p-dimen-xs">MTN</td>
      <td className="border p-dimen-xs">100MB</td>
      <td className="border p-dimen-xs">NGN 200.00</td>
      <td className="border p-dimen-xs">7 days</td>
    </tr>
  );
}

export default function Product() {
  return (
    <div className="container">

      <AccountH2Component text="Product" />

      <section className="mb-dimen-lg">

        <div className="flex gap-dimen-sm items-center mb-dimen-md flex-wrap">
          <IoCube className="text-3xl" />
          <h3 className="font-bold text-xl">Internet Data</h3>
          <span className="text-sm text-color-on-primary bg-green-500 rounded-full px-dimen-sm py-dimen-xxs">Available</span>
          <Link 
            to="edit" 
            className="text-color-primary font-bold border border-color-primary px-dimen-sm rounded-full hover:bg-color-primary-variant"
          >
            Edit
          </Link>
        </div>

        <div className="w-fit shadow shadow-color-primary p-dimen-sm rounded-lg">
          <div className="font-bold">Description</div>
          <p>
            Purchase and enjoy our very low rate data plans for your internet browsing data bundle.
          </p>
        </div>

      </section>

      <section>
        <h4 className="font-bold">Product units</h4>
        <div className="table-container">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border p-dimen-xs text-left">Network</th>
                <th className="border p-dimen-xs text-left">Data value</th>
                <th className="border p-dimen-xs text-left">Price</th>
                <th className="border p-dimen-xs text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <PricingItem />
              <PricingItem />
              <PricingItem />
              <PricingItem />
              <PricingItem />
              <PricingItem />
              <PricingItem />
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
