import { redirect, type LoaderFunction } from '@remix-run/node';
import Transaction from '~/models/transaction.model';
import { getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const reference = url.searchParams.get('reference');

  await TransactionApiService.updateStatus(
    reference as string, 
    { status: Transaction.STATUS_PENDING }, 
    accessToken
  );

  return redirect(`/account/transactions/${reference}`);
}
