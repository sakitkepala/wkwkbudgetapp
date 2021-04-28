import dataBudget from "./data-budget.json";
import * as DanaLineDB from "./danaLine";

let listBudget = [...dataBudget];

const getForeignDanaLines = async (budgetId) => {
  return await DanaLineDB.readByField("budgetId", budgetId);
};

/**
 * {
 *   id: 2
 *   bulan: "Desember"
 *   // kayanya lebih baik emang computed itu di front end aja og, hmm...
 *   // pake API REST mungkin akan beda implementasi dengan RPC-nya Odoo
 *   // danaDianggarkan: computed(),
 *
 *   // sedangkan data one to many baru oke di sini
 *   danaLineIds: getForeignData()
 * }
 */
async function read(budgetId) {
  const budget = !budgetId
    ? listBudget[dataBudget.length - 1]
    : listBudget.find((data) => data.id === budgetId);

  return {
    ...budget,
    danaLineIds: await getForeignDanaLines(budget.id),
  };
}

export { read };
