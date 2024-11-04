import { apiBaseUrl } from "./costants";

export const apiClient = async (url = "", options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30 * 1000);
  const token = localStorage.getItem("jwtToken");
  try {
    const request = new Request(`${apiBaseUrl}/${url}`, {
      method: options.method,
      headers: url === "login" ? new Headers({ "Content-Type": "application/json" }) : new Headers({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }),
      body: JSON.stringify(options.body),
      signal: controller.signal,
    });

    return await fetch(request).then(async (res) => {
      clearTimeout(timeoutId);
      if (res?.ok) {
        let data = await res.json();

        return { status: 200, data };
      } else {
        let data = await res?.json();
        return { status: res?.status, data: data };
      }
    });
  } catch (error) {
    clearTimeout(timeoutId);
    return { status: 500, data: { error: "Something went wrong" } };
  }
};

export const login = async (req) => {
  return await apiClient("login", {
    method: "POST",
    body: req,
  }).then((res) => {
    return res;
  });
};

export const addCategory = async (req) => {
  return await apiClient("add", {
    method: "POST",
    body: req,
  }).then((res) => {
    return res;
  });
};

export const categoryList = async (req) => {
  return await apiClient("categories", {
    method: "GET",
  }).then((res) => {
    return res;
  });
};

export const foodByCategoryList = async (category) => {
  return await apiClient(`${apiBaseUrl}/FoodByCat/${category}`, {
    method: "GET",
  }).then((res) => {
    return res;
  });
};

export const bills = async (req) => {
  return await apiClient("api/bills", {
    method: "POST",
    body: req,
  }).then((res) => {
    return res;
  });
};

export const allfoods = async () => {
  return await apiClient("allfoods", {
    method: "GET",
  }).then((res) => {
    return res;
  });
};

export const deleteProduct = async (id) => {
  return await apiClient(`delete/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return res;
  });
};
