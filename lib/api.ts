import { getApiUrl } from "./utils";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

type ApiFetchOptions = RequestInit & {
  token?: string;
  skipAuthRedirect?: boolean;
};

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { token, skipAuthRedirect, headers, ...rest } = options;

  const response = await fetch(`${getApiUrl()}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && !skipAuthRedirect) {
      unauthorizedHandler?.();
    }

    let message = "Une erreur est survenue";
    try {
      const data = (await response.json()) as { message?: string | string[] };
      message = Array.isArray(data.message)
        ? data.message.join(", ")
        : (data.message ?? message);
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getAuthHeaders(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
