import { Link } from '@remix-run/react';
import useDateFormat from '~/hooks/date-format.hook';
import type Brand from '~/models/brand.model';

export default function BrandItemComponent(
  { brand }: { brand: Brand; }
) {
  const dateFormat = useDateFormat();

  return (
    <tr className="border">
      <td className="border p-dimen-xs">{ brand.id }</td>
      <td className="border p-dimen-xs">{ brand.name }</td>
      <td className="border p-dimen-xs">
        <img src={ brand.photo.href } alt={brand.name} className="w-dimen-xxxl h-dimen-xxxl" />
      </td>
      <td className="border p-dimen-xs">{ brand.apiCode }</td>
      <td className="border p-dimen-xs">{ dateFormat(brand.createdAt) }</td>
      <td className="border p-dimen-xs">
        <Link to={String(brand.id)} className="table-button">View</Link>
      </td>
    </tr>
  );
}
