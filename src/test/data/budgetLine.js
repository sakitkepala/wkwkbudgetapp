import dataBudgetLine from "./data-budgetLine.json";

let listBudgetLine = [...dataBudgetLine];

async function readAll() {
  return listBudgetLine;
}

async function searchByField(field, value) {
  return listBudgetLine.filter((line) => line[field] === value);
}

export { readAll, searchByField };

// TODO:
// async function create(budget) {
//   listBudget.push(budget);
//   return budget;
// }

// async function read(budgetId) {
//   return listBudget.find((budget) => budget.id === budgetId);
// }

// async function reset() {
//   listBudget = [...dataBudget];
// }
