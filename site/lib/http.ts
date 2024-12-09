import { environment } from "./environment";

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

export class HTTP {
  constructor(
    private _baseUrl: string = environment.apiUrl,
    private _headers: Record<string, string> = {}
  ) {}

  get headers() {
    return this._headers;
  }

  set headers(headers: Record<string, string>) {
    this._headers = headers;
  }

  private async request<T>(
    method: HTTPMethod,
    url: string,
    headers: Record<string, string> = {},
    body?: any
  ): Promise<T> {
    const response = await fetch(this._baseUrl + url, {
      method,
      headers: {
        ...this._headers,
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  async get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>("GET", url, headers);
  }

  async post<T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>("POST", url, {
      "Content-Type": "application/json",
      ...headers,
    }, body);
  }

  async put<T>(
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>("PUT", url, {
      "Content-Type": "application/json",
      ...headers,
    }, body);
  }
}
