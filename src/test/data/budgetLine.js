import dataBudgetLine from "./data-budgetLine.json";

let listBudgetLine = [...dataBudgetLine];

async function readAll() {
  return listBudgetLine;
}

async function searchByField(field, value) {
  return listBudgetLine.filter((line) => line[field] === value);
}

export { readAll, searchByField };
