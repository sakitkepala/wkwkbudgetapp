import dataDanaLine from "./data-danaLine.json";

async function readAll() {
  return dataDanaLine;
}

async function readByField(field, value) {
  return dataDanaLine.filter((line) => line[field] === value);
}

export { readAll, readByField };
