import apiFetch from "../utils/api-fetch";

export const getProducts = () => {
  return apiFetch("/products")
    .then((data) => data)
    .catch((error) => error);
};

export const getProductId = (id) => {
  return apiFetch(`/products/${id}`)
    .then((data) => data)
    .catch((error) => error);
};

export const createProduct = (dataProduct) => {
  return apiFetch("/products", { body: dataProduct })
    .then((data) => data)
    .catch((error) => error);
};

export const deleteProductId = (id) => {
  return apiFetch(`/products/${id}`, { method: "DELETE" }).catch(
    (error) => error
  );
};

export const updateProductId = (id, dataProduct) => {
  return apiFetch(`/products/${id}`, { method: "PATCH", body: dataProduct })
    .then((data) => data)
    .catch((error) => error);
};
