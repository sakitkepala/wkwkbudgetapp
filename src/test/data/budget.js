import dataBudget from "./data-budget.json";

let listBudget = [...dataBudget];
let latestBudget = dataBudget[dataBudget.length - 1];

async function read(budgetId) {
  if (budgetId) {
    return listBudget.find((data) => data.id === budgetId);
  }
  return latestBudget;
}

export { read };
