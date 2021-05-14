import dataKategori from "./data-kategori.json";

let listKategori = [...dataKategori];

async function readAll() {
  return listKategori;
}

async function read(id) {
  return listKategori.find((line) => line.id === id);
}

async function searchByField(field, value) {
  return listKategori.filter((line) => line[field] === value);
}

async function update(valueObj) {
  // reassign data source-nya setiap kali ada update/delete
  // supaya data yang depend ke sini ikut update waktu di-fetch/query
  listKategori = listKategori.map((line) => {
    if (line.id === valueObj.id) {
      return { ...line, ...valueObj };
    }
    return line;
  });
  return read(valueObj.id);
}

export { read, readAll, searchByField, update };
