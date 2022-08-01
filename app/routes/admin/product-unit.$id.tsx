import { type ActionFunction, json, redirect, type LoaderFunction, Response } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import CheckboxComponent from "~/components/form/checkbox.component";
import InputComponent from "~/components/form/input.component";
import SelectComponent from "~/components/form/select.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";
import type Brand from "~/models/brand.model";
import type ProductUnit from "~/models/product-unit.model";
import type ValidationError from "~/models/validation-error.model";
import { commitSession, getSession } from "~/server/session.server";
import BrandApiService from "~/services/brand-api.service";
import ProductUnitApiService from "~/services/product-unit-api.service";

type LoaderData = {
  success: string;
  brands: Brand[];
  productUnit: ProductUnit;
  errors: {
    form: string;
    name: string;
    apiCode: string;
    price: string;
    purchasingPrice: string;
    duration: string;
    type: string;
    brandId: string;
    productId: string;
    available: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const [brandResponse, productUnitResponse] = await Promise.all([
    BrandApiService.read(session.get('accessToken')),
    ProductUnitApiService.readOne(params.id as string),
  ]);

  if (productUnitResponse.statusCode !== 200) {
    throw new Response('Error', { status: productUnitResponse.statusCode });
  }

  const data = { 
    success: session.get('success'),
    brands: brandResponse.data,
    productUnit: productUnitResponse.data,
    errors: {
      form: session.get('formError'),
      name: session.get('nameError'),
      apiCode: session.get('apiCodeError'),
      price: session.get('priceError'),
      purchasingPrice: session.get('purchasingPriceError'),
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

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const productUnitResponse = await ProductUnitApiService.readOne(params.id as string);

  const productUnit = productUnitResponse.data;
  
  const form = await request.formData();
  const name = form.get('name')?.toString();
  const apiCode = form.get('apiCode')?.toString();
  const price = form.get('price')?.toString();
  const purchasingPrice = form.get('purchasingPrice')?.toString();
  const duration = form.get('duration')?.toString();
  const type = form.get('type')?.toString();
  const available = form.get('available')?.toString();
  const brandId = form.get('brandId')?.toString();

  const apiResponse = await ProductUnitApiService.update(
    productUnit.id,
    { 
      name: productUnit.name !== name ? name : undefined, 
      type: productUnit.type !== type ? type : undefined,
      apiCode: productUnit.apiCode !== Number(apiCode) ? Number(apiCode) : undefined, 
      price: productUnit.price !== Number(price) ? Number(price) : undefined,
      purchasingPrice: productUnit.purchasingPrice !== Number(purchasingPrice) ? Number(purchasingPrice) : undefined,
      duration: productUnit.duration !== Number(duration) ? Number(duration) : undefined,
      available: productUnit.available !== (available === 'on') ? available === 'on' : undefined,
      brandId: productUnit.brandId !== Number(brandId) ? Number(brandId) : undefined,
    }, 
    accessToken
  );

  if (apiResponse.statusCode === 200) {
    session.flash('success', apiResponse.message);
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  } else {
    session.flash('formError', 'Oops! An error occured.');
  }
 
  return redirect(new URL(request.url).pathname, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function ProductUnitEdit() {
  const transition = useTransition();

  const { productUnit, brands, success, errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    } else if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [success, errors.form, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Edit product unit" />

      <Form className="account-form" method="post" autoComplete="off">

        <fieldset disabled={transition.state !== 'idle'}>
          <InputComponent 
            id="name-input" 
            name="name" 
            label="Name"
            value={productUnit.name}
            error={errors.name}
          />

          <InputComponent 
            id="price-input" 
            name="price" 
            label="Price"
            type="number"
            step="0.01"
            value={productUnit.price}
            error={errors.price}
          />

          <InputComponent 
            id="purchasing-price-input" 
            name="purchasingPrice" 
            label="Purchasing price (Amount to pay to Tentendata)"
            type="number"
            step="0.01"
            value={productUnit.purchasingPrice}
            error={errors.purchasingPrice}
          />

          <InputComponent 
            id="duration-input" 
            name="duration" 
            label="Duration (days)"
            type="number"
            value={productUnit.apiCode}
            error={errors.duration}
          />

          <InputComponent 
            id="api-code-input" 
            name="apiCode" 
            label="API code (From Tentendata)"
            type="number"
            value={productUnit.apiCode}
            error={errors.apiCode}
          />

          <InputComponent 
            id="type-input" 
            name="type" 
            label="Type"
            required={false}
            value={productUnit.type}
            error={errors.type}
          />

          <SelectComponent 
            id="brand-id-input"
            label="Brand"
            name="brandId"
            value={productUnit.brandId}
            error={errors.brandId}
            options={brands.map(item => ({ text: item.name, value: item.id }))}
          />

          <SelectComponent 
            id="product-id-input"
            label="Product"
            name="productId"
            value={productUnit.product.id}
            error={errors.productId}
            options={[ 
              { text: productUnit.product.name, value: productUnit.product.id },
            ]}
          />

          <CheckboxComponent 
            id="availability-input"
            name="available"
            label="Product unit is available"
            required={false}
            checked={productUnit.available}
            error={errors.available}
          />

          <SubmitButtonComponent text="Edit" topSpace />
        </fieldset>
        
      </Form>

      <ToastContainer />

    </div>
  );
}
