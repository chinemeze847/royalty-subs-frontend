import { Link } from '@remix-run/react';
import useProductIcon from '~/hooks/product-icon.hook';
import type Product from '~/models/product.model';

export default function ProductLIItemComponent(
  { product }: { product: Product }
) {

  const productIcon = useProductIcon();

  const Icon = productIcon(product.id);

  return (
    <li className="mb-dimen-md flex-grow">
      <Link 
        to={`products/${product.id}`} 
        className="block shadow shadow-color-primary rounded-lg p-dimen-lg text-center hover:bg-color-background"
      >
        <Icon className="text-5xl rounded-full mx-auto bg-color-primary text-color-primary-variant" />
        <div className="font-bold text-lg mt-dimen-md">{ product.name }</div>
      </Link>
    </li>
  );
}
