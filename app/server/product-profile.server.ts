import { json } from '@remix-run/node';
import type Brand from '~/models/brand.model';
import type Product from '~/models/product.model';
import ProductApiService from '~/services/product-api.service';

export type LoaderData = { 
  product: Product; 
  brands: Brand[];
  activeBrand: number;
};

export const productProfileLoader = async (request: Request, params: any) => {
  const url = new URL(request.url);

  const [response, unitsResponse] = await Promise.all([
    ProductApiService.readOne(params.id),
    ProductApiService.readProductUnits(params.id),
  ]);

  if (response.statusCode !== 200) {
    throw new Response('Error', { status: response.statusCode });
  } else if (unitsResponse.statusCode !== 200) {
    throw new Response('Error', { status: unitsResponse.statusCode });
  }

  const product = response.data;

  product.productUnits = unitsResponse.data;

  const brands = new Map<number, Brand>();

  product.productUnits.forEach((item) => brands.set(item.brand.id, item.brand));

  const brandsArray = Array.from(brands.values());

  const activeBrand = Number(url.searchParams.get('brand')) || brandsArray[0]?.id;

  return json<LoaderData>({ product, brands: brandsArray, activeBrand });
}
