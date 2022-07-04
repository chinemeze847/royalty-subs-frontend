import { type ActionFunction, json, type LoaderFunction, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import CheckboxComponent from '~/components/form/checkbox.component';
import InputComponent from '~/components/form/input.component';
import SelectComponent from '~/components/form/select.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type Brand from '~/models/brand.model';
import type ProductUnit from '~/models/product-unit.model';
import type Product from '~/models/product.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import BrandApiService from '~/services/brand-api.service';
import ProductApiService from '~/services/product-api.service';
import ProductUnitApiService from '~/services/product-unit-api.service';

type LoaderData = {
  brands: Brand[];
  product: Product;
  errors: {
    name: string;
    apiCode: string;
    price: string;
    duration: string;
    type: string;
    brandId: string;
    productId: string;
    available: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const [brandResponse, productResponse] = await Promise.all([
    BrandApiService.read(session.get('accessToken')),
    ProductApiService.readOne(params.id as string),
  ]);

  const data = { 
    brands: brandResponse.data,
    product: productResponse.data,
    errors: {
      name: session.get('nameError'),
      apiCode: session.get('apiCodeError'),
      price: session.get('priceError'),
      duration: session.get('durationError'),
      type: session.get('typeError'),
      brandId: session.get('brandIdError'),
      productId: session.get('productIdError'),
      available: session.get('availableError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');
  
  const form = await request.formData();
  const name = form.get('name')?.toString();
  const apiCode = form.get('apiCode')?.toString();
  const price = form.get('price')?.toString();
  const duration = form.get('duration')?.toString();
  const type = form.get('type')?.toString();
  const available = form.get('available')?.toString();
  const productId = form.get('productId')?.toString();
  const brandId = form.get('brandId')?.toString();

  let redirectTo = new URL(request.url).pathname;

  const apiResponse = await ProductUnitApiService.create({ 
    name, 
    type: type || undefined,
    apiCode: Number(apiCode), 
    price: Number(price),
    duration: Number(duration),
    available: available === 'on',
    productId: Number(productId),
    brandId: Number(brandId),
  }, accessToken);

  if (apiResponse.statusCode === 201) {
    const productUnit = apiResponse.data as ProductUnit;
    redirectTo = `/admin/product-unit/${productUnit.id}`;
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }
 
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function AddProductUnit() {
  const transition = useTransition();

  const data = useActionData();

  const { errors, brands, product } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Add product unit" />

      <Form className="account-form" method="post" autoComplete="off">

        <fieldset disabled={transition.state === 'loading'}>
          <InputComponent 
            id="name-input" 
            name="name" 
            label="Name"
            value={data?.name}
            error={errors.name}
          />

          <InputComponent 
            id="price-input" 
            name="price" 
            label="Price"
            type="number"
            step="0.01"
            value={data?.price}
            error={errors.price}
          />

          <InputComponent 
            id="duration-input" 
            name="duration" 
            label="Duration (days)"
            type="number"
            value={data?.apiCode}
            error={errors.duration}
          />

          <InputComponent 
            id="api-code-input" 
            name="apiCode" 
            label="API code"
            type="number"
            value={data?.apiCode}
            error={errors.apiCode}
          />

          <InputComponent 
            id="type-input" 
            name="type" 
            label="Type"
            required={false}
            value={data?.type}
            error={errors.type}
          />

          <SelectComponent 
            id="brand-id-input"
            label="Brand"
            name="brandId"
            value={data?.brandId}
            error={errors.brandId}
            options={brands.map(item => ({ text: item.name, value: item.id }))}
          />

          <SelectComponent 
            id="product-id-input"
            label="Product"
            name="productId"
            value={product.id}
            error={errors.productId}
            options={[ 
              { text: product.name, value: product.id },
            ]}
          />

          <CheckboxComponent 
            id="availability-input"
            name="available"
            label="Product unit is available"
            required={false}
            checked={data?.available}
            error={errors.available}
          />

          <SubmitButtonComponent text="Add" topSpace />
        </fieldset>
        
      </Form>

    </div>
  );
}
