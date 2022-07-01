import { Link } from "@remix-run/react";
import type Product from "~/models/product.model";

export default function ProductItemComponent({ product }: { product: Product }) {
  return (
    <tr className="border">
      <td className="border p-dimen-xs">{ product.id }</td>
      <td className="border p-dimen-xs">{ product.name }</td>
      <td className="border p-dimen-xs">{ String(product.available) }</td>
      <td className="border p-dimen-xs">
        <Link 
          to={String(product.id)} 
          className="table-button"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
