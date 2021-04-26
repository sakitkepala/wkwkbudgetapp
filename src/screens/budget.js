import React from "react";
import { InitialBudget } from "./budget-welcome";
import { ManajemenBudget } from "./budget-manajemen";
import { client as apiClient } from "../utils";

function BudgetScreen() {
  // TODO: implemen pakai context?
  const [listAkun, setListAkun] = React.useState(null);

  React.useEffect(() => {
    if (listAkun) {
      return;
    }

    apiClient("/akun").then(
      (respon) => {
        setListAkun(respon.data);
      },
      (error) => {
        console.log("Error:", error.message);
      }
    );
  }, [listAkun]);

  return !listAkun || listAkun.length === 0 ? (
    <InitialBudget onSimpanAkun={setListAkun} />
  ) : (
    <ManajemenBudget />
  );
}

export { BudgetScreen };
