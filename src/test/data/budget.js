import dataBudget from "./data-budget.json";

let listBudget = [...dataBudget];

async function readAll(budgetId) {
  return listBudget;
}

async function readLatest() {
  return listBudget[dataBudget.length - 1];
}

export { readAll, readLatest };
