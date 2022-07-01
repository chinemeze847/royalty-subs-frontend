import { Link } from '@remix-run/react';
import useMoneyFormat from '~/hooks/money-format.hook';
import type ProductUnit from '~/models/product-unit.model';

export default function ProductUnitItemComponent(
  { productUnit }: { productUnit: ProductUnit}
) {
  const moneyFormat = useMoneyFormat();

  return (
    <tr className="border">
      <td className="border p-dimen-xs">{ productUnit.brand.name }</td>
      <td className="border p-dimen-xs">{ productUnit.name }</td>
      <td className="border p-dimen-xs">NGN {moneyFormat(productUnit.price)}</td>
      <td className="border p-dimen-xs">{ productUnit.duration ? `${productUnit.duration} days` : 'None' }</td>
      <td className="border p-dimen-xs">{ String(productUnit.available) }</td>
      <td className="border p-dimen-xs">{ productUnit.type ?? 'None' }</td>
      <td className="border p-dimen-xs">
        <Link to={`/admin/product-unit/${productUnit.id}`} className="table-button">View</Link>
      </td>
    </tr>
  );
}
