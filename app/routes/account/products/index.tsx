import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import ProductsTableComponent from '~/components/utils/products-table.component';
import type Product from '~/models/product.model';
import ProductApiService from '~/services/product-api.service';

type LoaderData = {
  products: Product[];
};

export const loader: LoaderFunction = async () => {
  const response = await ProductApiService.read();

  return json<LoaderData>({ products: response.data });
};

export default function ProductsIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <ProductsTableComponent products={data.products} />
  );
}
