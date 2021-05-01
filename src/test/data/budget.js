import dataBudget from "./data-budget.json";

let listBudget = [...dataBudget];

async function readLatest(budgetId) {
  return listBudget[dataBudget.length - 1];
}

export { readLatest };
