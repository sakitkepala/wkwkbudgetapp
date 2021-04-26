import React from "react";
import { InitialBudget } from "./budget-welcome";
import { ManajemenBudget } from "./budget-manajemen";

function BudgetScreen() {
  const [listAkun, setListAkun] = React.useState(null);

  return !listAkun ? (
    <InitialBudget onSimpanAkun={setListAkun} />
  ) : (
    <ManajemenBudget />
  );
}

export { BudgetScreen };
