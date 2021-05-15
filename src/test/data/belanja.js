import dataBelanja from "./data-belanja.json";

let listBelanja = [...dataBelanja];

async function readAll() {
  return listBelanja;
}

async function read(id) {
  return listBelanja.find((belanja) => belanja.id === id);
}

async function searchByField(field, val) {
  return listBelanja.filter((belanja) => belanja[field] === val);
}

async function search(queries) {
  const fields = Object.keys(queries);
  return listBelanja.filter((belanja) =>
    fields.every((field) => belanja[field] === queries[field])
  );
}

async function create(val) {
  const idBaru =
    listBelanja.length > 0 ? listBelanja[listBelanja.length - 1].id + 1 : 1;
  listBelanja.push({ ...val, id: idBaru });

  return await read(idBaru);
}

export { readAll, read, searchByField, search, create };
