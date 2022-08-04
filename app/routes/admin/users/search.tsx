import { redirect, type LoaderFunction } from '@remix-run/node';
import { getSession } from '~/server/session.server';
import UserApiService from '~/services/user-api.service';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const email = new URL(request.url).searchParams.get("email");

  if (email === null || email.length === 0) {
    throw new Response('Error', { status: 404 });
  }
  
  const res = await UserApiService.readOne(email, accessToken);

  if (res.statusCode !== 200) {
    throw new Response('Error', { status: res.statusCode });
  }

  return redirect(`admin/users/${res.data.id}`);
}
