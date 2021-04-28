import dataBudget from "./data-budget.json";
import dataDanaLine from "./data-danaLine.json";

let listBudget = [...dataBudget];
let latestBudget = dataBudget[dataBudget.length - 1];

const computeDanaDianggarkan = (budgetId) => {
  const totalAwal = 0;
  const reducerTotal = (total, line) => {
    if (line.budgetId === budgetId) {
      return total + line.jumlah;
    }
    return 0;
  };
  const totalDana = dataDanaLine.reduce(reducerTotal, totalAwal);
  return totalDana;
};

async function read(budgetId) {
  const budget = !budgetId
    ? latestBudget
    : listBudget.find((data) => data.id === budgetId);

  return {
    ...budget,
    danaDianggarkan: computeDanaDianggarkan(budget.id),
  };
}

export { read };
