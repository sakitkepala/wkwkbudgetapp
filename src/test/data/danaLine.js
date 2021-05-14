import dataDanaLine from "./data-danaLine.json";

async function readAll() {
  return dataDanaLine;
}

async function searchByField(field, value) {
  return dataDanaLine.filter((line) => line[field] === value);
}

export { readAll, searchByField };
