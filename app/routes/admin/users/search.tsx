import { redirect, type LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  return redirect(`admin/users/${email}`);
}
