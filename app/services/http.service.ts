const HttpService = {
  PAGE_LIMIT: 10,

  get(path: string, accessToken?: string) {
    const headers = new Headers();

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return fetch(`${process.env.API_URL}${path}`, {
      headers,
      method: 'GET',
    });
  },

  mutate(
    path: string, 
    method: string, 
    form: any, 
    accessToken?: string
  ) {
    const headers = new Headers();

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return fetch(`${process.env.API_URL}${path}`, { 
      method, 
      headers,
      body: form,
    });
  },

  post(path: string, form: { [key: string]: any }, accessToken?: string) {
    return this.mutate(path, 'POST', form, accessToken);
  },

  put(path: string, form: { [key: string]: any }, accessToken?: string) {
    return this.mutate(path, 'PUT', form, accessToken);
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

    return fetch(`${process.env.API_URL}${path}`, { 
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
