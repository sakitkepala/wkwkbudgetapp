import dataBudgetLine from "./data-budgetLine.json";

let listBudgetLine = [...dataBudgetLine];

async function readAll() {
  return listBudgetLine;
}

async function read(id) {
  return listBudgetLine.find((line) => line.id === id);
}

async function searchByField(field, value) {
  return listBudgetLine.filter((line) => line[field] === value);
}

async function update(valueObj) {
  // reassign data source-nya setiap kali ada update/delete
  // supaya data yang depend ke sini ikut update waktu di-fetch/query
  listBudgetLine = listBudgetLine.map((line) => {
    if (line.id === valueObj.id) {
      return { ...line, ...valueObj };
    }
    return line;
  });
  return read(valueObj.id);
}

export { read, readAll, searchByField, update };
