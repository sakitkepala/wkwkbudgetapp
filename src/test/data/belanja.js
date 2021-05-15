import dataBelanja from "./data-belanja.json";

let listBelanja = [...dataBelanja];

async function readAll() {
  return listBelanja;
}

async function read(id) {
  return listBelanja.find((belanja) => belanja.id === id);
}

async function create(val) {
  const idBaru =
    listBelanja.length > 0 ? listBelanja[listBelanja.length - 1].id + 1 : 1;
  listBelanja.push({ ...val, id: idBaru });

  return await read(idBaru);
}

export { readAll, read, create };
