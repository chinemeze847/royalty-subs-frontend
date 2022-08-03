import { json, Response, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import TransactionDLComponent from '~/components/utils/transaction-dl.component';
import type Transaction from '~/models/transaction.model';
import { getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';

type LoaderData = { transaction: Transaction; };

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const apiResponse = await TransactionApiService.readOne(params.id as string, accessToken);

  if (apiResponse.statusCode !== 200) {
    throw new Response('Error', { status: apiResponse.statusCode });
  }
  
  return json<LoaderData>({ transaction: apiResponse.data });
}

export default function TransactionProfile() {
  const { transaction } = useLoaderData<LoaderData>();

  return (
    <TransactionDLComponent transaction={transaction} />
  );
}
