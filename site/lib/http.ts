import { logout, refreshToken } from "./auth.js";
import { environment } from "./environment.js";

export class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "CONNECT"
  | "TRACE";

export type HTTPResponse<T> = {
  status: number;
  body: T;
};

export class HTTP {
  constructor(
    private _opts: {
      baseUrl?: string;
      headers?: Record<string, string>;
      throwOnFailure?: boolean;
      autoRetryLogin?: boolean;
    } = {}
  ) {
    this._opts = {
      baseUrl: environment.apiUrl,
      headers: {},
      throwOnFailure: true,
      autoRetryLogin: true,
      ..._opts,
    };
  }

  get headers() {
    return this._opts.headers || {};
  }

  set headers(headers: Record<string, string>) {
    this._opts.headers = headers;
  }

  private async request<T>(
    method: HTTPMethod,
    url: string,
    headers: Record<string, string> = {},
    body?: any
  ): Promise<HTTPResponse<T>> {
    if (!url.endsWith("/")) {
      url += "/";
    }

    const response = await fetch(this._opts.baseUrl + url, {
      method,
      headers: {
        ...this._opts.headers,
        ...headers,
      },
      body: body
    });

    if (response.status === 401 && this._opts.autoRetryLogin) {
      try {
        await refreshToken();
        return this.request(method, url, headers, body);
      } catch (err) {
        alert("Your session has expired. Please log in again.");
        logout();
      }
    }

    if (response.status >= 400 && this._opts.throwOnFailure) {
      throw new ApiError(response.status, (await response.json()).detail);
    }

    return {
      status: response.status,
      body: (await response.json()) as T,
    };
  }

  async get<T>(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>("GET", url, headers);
  }

  async post<T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(
      "POST",
      url,
      {
        "Content-Type": "application/json",
        ...headers,
      },
      JSON.stringify(body)
    );
  }

  async postMultipart<T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(
      "POST",
      url,
      {
        ...headers,
      },
      body
    );
  }

  async put<T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(
      "PUT",
      url,
      {
        "Content-Type": "application/json",
        ...headers,
      },
      JSON.stringify(body)
    );
  }

  async patch<T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(
      "PATCH",
      url,
      {
        "Content-Type": "application/json",
        ...headers,
      },
      JSON.stringify(body)
    );
  }

  async delete<T>(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>("DELETE", url, headers);
  }
}
