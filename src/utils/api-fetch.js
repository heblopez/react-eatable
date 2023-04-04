import { API_TOKEN_KEY, API_BASE_URI } from "./config";

const tokenKey = API_TOKEN_KEY;
const BASE_URI = API_BASE_URI;

export default async function apiFetch(
  endpoint,
  { method, headers, body } = {}
) {
  const token =
    import.meta.env.VITE_API_TOKEN || sessionStorage.getItem(tokenKey);

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  if (body) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  const config = {
    method: method || (body ? "POST" : "GET"),
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(BASE_URI + endpoint, config);

  let data;
  if (!response.ok) {
    if (token && response.status == 401) {
      sessionStorage.removeItem(tokenKey);
      window.location.reload();
    }
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors);
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }

  return data;
}
