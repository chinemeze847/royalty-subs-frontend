import { type ActionFunction, json, type LoaderFunction, redirect, Response } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import CheckboxComponent from '~/components/form/checkbox.component';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import TextareaComponent from '~/components/form/textarea.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type Product from '~/models/product.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import ProductApiService from '~/services/product-api.service';

type LoaderData = { 
  product: Product; 
  success: string;
  errors: {
    name: string;
    description: string;
    available: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const response = await ProductApiService.readOne(params.id as string);

  if (response.statusCode !== 200) {
    throw new Response('Error', { status: response.statusCode });
  }

  const data = { 
    product: response.data, 
    success: session.get('success'), 
    errors: {
      name: session.get('nameError'),
      description: session.get('descriptionError'),
      available: session.get('availableError'),
    },
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const productResponse = await ProductApiService.readOne(params.id as string);

  const product = productResponse.data;

  const form = await request.formData();
  const name = form.get('name')?.toString();
  const description = form.get('description')?.toString();
  const available = form.get('available')?.toString() === 'on';

  const data = {} as any;

  if (name !== product.name) {
    data.name = name;
  }

  if (description !== product.description) {
    data.description = description;
  }

  if (available !== product.available) {
    data.available = available;
  }

  const apiResponse = await ProductApiService.update(
    params.id as string, data, accessToken
  );

  if (apiResponse.statusCode === 200) {
    session.flash('success', apiResponse.message);
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }

  return redirect(new URL(request.url).pathname, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function ProductEdit() {
  const transition = useTransition();

  const { product, errors, success } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    }
  }, [success, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Edit product" />

      <Form className="account-form" method="post" autoComplete="off">

        <fieldset disabled={transition.state === 'loading'}>
          <InputComponent 
            id="name-input" 
            name="name" 
            label="Product name"
            value={product.name}
            error={errors.name}
          />

          <TextareaComponent 
            id="description-input" 
            name="description" 
            label="Product description" 
            value={product.description}
            error={errors.description}
          />

          <CheckboxComponent 
            id="availability-input"
            name="available"
            required={false}
            label="Product is available"
            checked={product.available}
          />

          <SubmitButtonComponent text="Edit" topSpace />
        </fieldset>
        
      </Form>

      <ToastContainer />

    </div>
  );
}
