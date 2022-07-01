import { type ActionFunction, json, redirect, type LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import FileInputComponent from '~/components/form/file-input.component';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type Brand from '~/models/brand.model';
import type ResponseDto from '~/models/response-dto.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import BrandApiService from '~/services/brand-api.service';
import PhotoApiService from '~/services/photo-api.service';

type LoaderData = { 
  brand: Brand; 
  success: string;
  errors: {
    name: string;
    apiCode: string;
    photo: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const brandResponse = await BrandApiService.readOne(params.id as string, accessToken);

  const data = { 
    brand: brandResponse.data, 
    success: session.get('success'),
    errors: {
      name: session.get('nameError'),
      apiCode: session.get('apiCodeError'),
      photo: session.get('photoError'),
    },
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

  const brandResponse = await BrandApiService.readOne(params.id as string, accessToken);

  const brand = brandResponse.data;

  const form = await request.formData();

  let apiResponse: ResponseDto<any> | null = null;

  if (form.has('photo')) {
    apiResponse = await PhotoApiService.update(
      brand.photo.id, form, accessToken
    );
  } else if (form.has('name')) {
    
    const name = form.get('name')?.toString();
    const apiCode = form.get('apiCode')?.toString();

    apiResponse = await BrandApiService.update(
      params.id as string, 
      { 
        name: brand.name !== name ? name : undefined, 
        apiCode: brand.apiCode !== Number(apiCode) ? apiCode : undefined, 
      }, 
      accessToken
    );
  }

  if (apiResponse !== null) {
    if (apiResponse.statusCode === 200) {
      session.flash('success', apiResponse.message);
    } else if (apiResponse.statusCode === 400) {
      const errors = apiResponse.data as ValidationError[];
      errors.forEach(item => session.flash(`${item.name}Error`, item.message));
    }
  }

  return redirect(new URL(request.url).pathname, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function BrandProfile() {
  const transition = useTransition();

  const { brand, success, errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    }
  }, [success, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Brand" />

      <Form className="account-form" method="post" autoComplete="off" encType="multipart/form-data">

        <FileInputComponent alt={brand.name} src={brand.photo.href} error={errors.photo} />

        <SubmitButtonComponent text="Upload photo" topSpace />

      </Form>

      <Form className="account-form" method="post" autoComplete="off">

        <fieldset disabled={transition.state === 'loading'}>
          <InputComponent 
            id="name-input" 
            name="name" 
            label="Brand name"
            value={brand.name}
            error={errors.name}
          />

          <InputComponent 
            id="api-code-input" 
            name="apiCode" 
            label="Brand API code"
            value={brand.apiCode}
            type="number"
            error={errors.name}
          />

          <SubmitButtonComponent text="Update" topSpace />
        </fieldset>
        
      </Form>

      <ToastContainer />

    </div>
  );
}
