interface Response {
  code?: number;
  res?: any;
  err?: any;
  count?: number;
}

interface RequestMethods {
  get(url: string, params?: object): Promise<Response>;
  post(url: string, body?: object): Promise<Response>;
  put(url: string, body?: object): Promise<Response>;
  delete(url: string, body?: object): Promise<Response>;
}

class Request implements RequestMethods {
  private _options = {
    baseURL: useRuntimeConfig().public.baseURL,
  };

  async get(url: string, params = {}): Promise<Response> {
    const { data, error } = await useFetch<Response>(url, {
      params,
      method: "GET",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`GET ${error.value}`);

    return this.getResponse(data.value || {});
  }
  async post(url: string, body: object = {}): Promise<Response> {
    const { data, error } = await useFetch<Response>(url, {
      body,
      method: "POST",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`POST ${error.value}`);

    return this.getResponse(data.value || {});
  }
  async put(url: string, body: object = {}): Promise<Response> {
    const { data, error } = await useFetch<Response>(url, {
      body,
      method: "PUT",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`PUT ${error.value}`);

    return this.getResponse(data.value || {});
  }
  async delete(url: string, body: object = {}): Promise<Response> {
    const { data, error } = await useFetch<Response>(url, {
      body,
      method: "DELETE",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`DELETE ${error.value}`);

    return this.getResponse(data.value || {});
  }

  private getResponse({ code, res, count }: Response): Response {
    return {
      code,
      res,
      count,
    };
  }
}

export default function () {
  const r = new Request();

  return {
    collaborator: {
      add(body: object): Promise<Response> {
        return r.post(`/collaborators`, body);
      },
      delete(ID: string): Promise<Response> {
        return r.delete(`/collaborators/${ID}`);
      },
      get(ID: string): Promise<Response> {
        return r.get(`/collaborators/${ID}`);
      },
      getAll(params: object): Promise<Response> {
        return r.get(`/collaborators`, params);
      },
      update(ID:string, body: object):Promise<Response>{
        return r.put(`/collaborators/${ID}`, body)
      }
    },
  };
}
