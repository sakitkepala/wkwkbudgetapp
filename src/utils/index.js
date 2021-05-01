function client(apiEndpoint, { data, ...customOptions } = {}) {
  const defaultOptions = {
    method: "GET",
  };
  const options = {
    ...defaultOptions,
    body: data ? JSON.stringify(data) : undefined,
    ...customOptions,
  };

  // `fetch` nge-return Promise
  return fetch(apiEndpoint, options).then(async (respon) => {
    const data = await respon.json();
    if (respon.ok) {
      return data;
    } else {
      return Promise.reject({ message: "tidak ok" });
    }
  });
}

export { client };
