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

  postJson(path: string, form: { [key: string]: any }, accessToken?: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (accessToken !== undefined) {
      headers.append('Authorization', accessToken);
    }

    return fetch(`${API_URL}${path}`, { 
      headers,
      method: 'POST', 
      body: JSON.stringify(form),
    });
  }
};

export default HttpService;
