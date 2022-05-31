
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

export default function PricingProduct() {
  return (
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
  );
}
