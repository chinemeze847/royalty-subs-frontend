import { API_URL } from "~/constants";

const HttpService = {
  get(path: string, accessToken?: string) {
    const headers = new Headers();

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return fetch(`${API_URL}${path}`, {
      headers,
      method: 'GET',
    });
  },

  mutateJson(
    path: string, 
    method: string, 
    form: { [key: string]: any }, 
    accessToken?: string
  ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return fetch(`${API_URL}${path}`, { 
      method, 
      headers,
      body: JSON.stringify(form),
    });
  },

  postJson(path: string, form: { [key: string]: any }, accessToken?: string) {
    return this.mutateJson(path, 'POST', form, accessToken);
  },

  putJson(path: string, form: { [key: string]: any }, accessToken?: string) {
    return this.mutateJson(path, 'PUT', form, accessToken);
  }
};

export default HttpService;
