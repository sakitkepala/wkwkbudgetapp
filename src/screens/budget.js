import React from "react";
import { InitialBudget } from "./budget-welcome";
import { ManajemenBudget } from "./budget-manajemen";

function BudgetScreen() {
  // TODO: implemen pakai context?
  const [listAkun, setListAkun] = React.useState(null);

  return !listAkun ? (
    <InitialBudget onSimpanAkun={setListAkun} />
  ) : (
    <ManajemenBudget />
  );
}

export { BudgetScreen };
