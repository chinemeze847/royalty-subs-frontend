import { json, redirect } from "@remix-run/node";
import type ValidationError from "~/models/validation-error.model";
import { commitSession, getSession } from "~/server/session.server";
import UserApiService from "~/services/user-api.service";

export type LoaderData = {
  success: string;
  errors: {
    password: string;
    newPassword: string;
  };
};

export const userPasswordLoader = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));

  const data = { 
    success: session.get('success'),
    errors: {
      password: session.get('passwordError'),
      newPassword: session.get('newPasswordError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const userPasswordAction = async (request: Request, redirectTo: 'account' | 'admin') => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const form = await request.formData();
  const password = form.get('password')?.toString();
  const newPassword = form.get('newPassword')?.toString();

  const apiResponse = await UserApiService.updatePassword(
    userId, { password, newPassword }, accessToken
  );

  if (apiResponse.statusCode === 200) {
    session.flash('success', apiResponse.message);
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }
  
  return redirect(`/${redirectTo}/change-password`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
