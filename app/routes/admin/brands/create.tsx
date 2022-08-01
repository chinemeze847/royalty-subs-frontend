import { type ActionFunction, json, redirect, type LoaderFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import FileInputComponent from '~/components/form/file-input.component';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type Brand from '~/models/brand.model';
import type Photo from '~/models/photo.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import BrandApiService from '~/services/brand-api.service';
import PhotoApiService from '~/services/photo-api.service';

type LoaderData = {
  errors: {
    form: string;
    name: string;
    apiCode: string;
    photo: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const data = { 
    errors: {
      form: session.get('formError'),
      name: session.get('nameError'),
      apiCode: session.get('apiCodeError'),
      photo: session.get('photoError'),
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

  let redirectTo = new URL(request.url).pathname;

  const photoResponse = await PhotoApiService.create(form, accessToken);

  if (photoResponse.statusCode === 201) {
    const photo = photoResponse.data as Photo;

    const apiResponse = await BrandApiService.create({ 
      name, apiCode, photoId: photo.id
    }, accessToken);
  
    if (apiResponse.statusCode === 201) {
      const brand = apiResponse.data as Brand;
      redirectTo = `/admin/brands/${brand.id}`;
    } else if (apiResponse.statusCode === 400) {
      const errors = apiResponse.data as ValidationError[];
      errors.forEach(item => session.flash(`${item.name}Error`, item.message));
    }
  } else if (photoResponse.statusCode === 400) {
    const errors = photoResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  } else {
    session.flash('formError', 'Oops! An error occured.');
  }
  
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function CreateBrand() {
  const transition = useTransition();

  const data = useActionData();

  const { errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Add Brand" />

      <Form className="account-form" method="post" autoComplete="off" encType="multipart/form-data">

        <fieldset disabled={transition.state !== 'idle'}>
          <FileInputComponent alt="add brand" src="/images/index-1.jpg" />

          <InputComponent 
            id="name-input" 
            name="name" 
            label="Brand name"
            value={data?.name}
            error={errors.name}
          />

          <InputComponent 
            id="api-code-input" 
            name="apiCode" 
            label="Brand API code (From Tentendata)"
            type="number"
            value={data?.apiCode}
            error={errors.apiCode}
          />

          <SubmitButtonComponent text="Add" topSpace />
        </fieldset>
        
      </Form>

      <ToastContainer />

    </div>
  );
}
