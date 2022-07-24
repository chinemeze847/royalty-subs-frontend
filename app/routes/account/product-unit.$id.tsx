import { type ActionFunction, json, redirect, type LoaderFunction, Response } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { IoCardOutline, IoCubeOutline } from 'react-icons/io5';
import BuyProductInputComponent from '~/components/form/buy-product-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import EmptyListComponent from '~/components/utils/empty-list.component';
import useMoneyFormat from '~/hooks/money-format.hook';
import Product from '~/models/product.model';
import type ProductUnit from '~/models/product-unit.model';
import type Transaction from '~/models/transaction.model';
import type TransactionsBalance from '~/models/transactions-balance.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import ProductUnitApiService from '~/services/product-unit-api.service';
import TransactionApiService from '~/services/transaction-api.service';
import UserApiService from '~/services/user-api.service';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type LoaderData = {
  balance: TransactionsBalance;
  productUnit: ProductUnit;
  errors: {
    form: string;
    productUnitId: string;
    recipientNumber: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [productUnitResponse, balanceResponse] = await Promise.all([
    ProductUnitApiService.readOne(params.id as string),
    UserApiService.readTransactionBalance(userId, accessToken),
  ]);

  if (productUnitResponse.statusCode !== 200) {
    throw new Response('Error', { status: productUnitResponse.statusCode });
  } else if (balanceResponse.statusCode !== 200) {
    throw new Response('Error', { status: balanceResponse.statusCode });
  }

  const productUnit = productUnitResponse.data;

  const recipientNumberErrorkey = (() => {
    switch(productUnit.product.id) {
      case Product.TYPE_DATA:
      case Product.TYPE_AIRTIME:
        return 'phoneNumberError';
  
      case Product.TYPE_CABLE:
        return 'smartCardNumberError';
      
      case Product.TYPE_ELECTRICITY:
        return 'meterNumberError';
  
      default:
        return '';
    }
  })();

  const data = { 
    productUnit,
    balance: balanceResponse.data,
    errors: {
      form: session.get('formError'),
      productUnitId: session.get('productUnitIdError'),
      recipientNumber: session.get(recipientNumberErrorkey),
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

  const apiResponse = await (() => {
    switch(productUnit.product.id) {
      case Product.TYPE_DATA:
        return TransactionApiService.paymentData({
          productUnitId: productUnit.id,
          phoneNumber: form.get('phoneNumber')?.toString(),
        }, accessToken);
      
      case Product.TYPE_AIRTIME:
        return TransactionApiService.paymentAirtime({
          productUnitId: productUnit.id,
          phoneNumber: form.get('phoneNumber')?.toString(),
        }, accessToken);
  
      case Product.TYPE_CABLE:
        return TransactionApiService.paymentCable({
          productUnitId: productUnit.id,
          smartCardNumber: form.get('smartCardNumber')?.toString(),
        }, accessToken);
      
      case Product.TYPE_ELECTRICITY:
        return TransactionApiService.paymentElectricity({
          productUnitId: productUnit.id,
          meterNumber: form.get('meterNumber')?.toString(),
        }, accessToken);
  
      default:
        throw new Response('Error', { status: 404 });
    }
  })();

  let redirectTo = new URL(request.url).pathname;

  if (apiResponse.statusCode === 201) {
    const transaction = apiResponse.data as Transaction;
    redirectTo = `/account/transactions/${transaction.id}`;
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
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

export default function ProductUnitProfile() {
  const transition = useTransition();

  const moneyFormat = useMoneyFormat();

  const data = useActionData();

  const { productUnit, balance, errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Buy product" />

      <Form className="account-form" method="post" autoComplete="off">

        <img 
          alt={productUnit.brand.name} 
          src={productUnit.brand.photo.href} 
          className="w-20 h-20 rounded-lg mx-auto mb-dimen-sm"
        />

        <dl>
          <ProfileDLItemComponent heading="Product" body={productUnit.product.name} />
          <ProfileDLItemComponent heading="Brand" body={String(productUnit.brand.name)} />
          <ProfileDLItemComponent heading="Name" body={String(productUnit.name)} />
          <ProfileDLItemComponent heading="Price" body={`NGN ${moneyFormat(productUnit.price)}`} />
          { productUnit.duration && <ProfileDLItemComponent heading="Duration" body={`${productUnit.duration} days`} /> }
          { productUnit.type && <ProfileDLItemComponent heading="Type" body={productUnit.type} /> }
        </dl>

        {
          balance.transactionsBalance < productUnit.price ? (
            <EmptyListComponent Icon={IoCardOutline} text="You have an insufficient wallet balance" /> 
          ) : (
            (productUnit.available && productUnit.product.available) ? (
              <fieldset disabled={transition.state === 'loading'}>
                <BuyProductInputComponent 
                  productId={productUnit.product.id} 
                  error={errors.recipientNumber || errors.productUnitId} 
                  value={data}
                />
                <SubmitButtonComponent text="Buy" topSpace />
              </fieldset>
            ) : (
              <EmptyListComponent Icon={IoCubeOutline} text="Product is unavailable" /> 
            )
          )
        }

      </Form>

      <ToastContainer />

    </div>
  );
}
