function client(apiEndpoint, customConfig = {}) {
  // TODO: config fetch
  // ...

  // `fetch` returns Promise
  return fetch(apiEndpoint, {}).then(async (respon) => {
    const data = await respon.json();
    if (respon.ok) {
      return data;
    } else {
      return Promise.reject({ message: "tidak ok" });
    }
  });
}

export { client };
