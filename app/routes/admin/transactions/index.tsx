import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import TransactionsTableComponent, { type LoaderData } from '~/components/utils/transactions-table.component';
import { getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const type = url.searchParams.get("type");

  const session = await getSession(request.headers.get('Cookie'));

  const res = await TransactionApiService.read(page, type, session.get('accessToken'));

  if (res.statusCode !== 200) {
    throw new Response('Error', { status: res.statusCode });
  }

  return json<LoaderData>({ 
    transactions: res.data, 
    pagination: res.metaData?.pagination as any,
  });
}

export default function TransactionsIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <TransactionsTableComponent data={data} />
  );
}
