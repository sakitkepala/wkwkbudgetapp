import React from "react";
import { InitialBudget as InitBudgetScreen } from "./budget-welcome";
import { ManajemenBudgetScreen } from "./budget-manajemen";
import { client as apiClient } from "../utils";

function useBudgetSetup() {
  const [isLoading, setIsLoading] = React.useState(false);
  // Setup sementara cuma cek data list akun
  const [listAkun, setListAkun] = React.useState(null);

  const isBudgetSiap = Boolean(listAkun) || listAkun?.length > 0;
  const budgetSetupData = {
    akun: listAkun,
  };

  React.useEffect(() => {
    if (isBudgetSiap || isLoading) {
      return;
    }

    setIsLoading(true);
    apiClient("/akun").then(
      (respon) => {
        setIsLoading(false);
        setListAkun(respon.data);
      },
      (error) => {
        setIsLoading(false);
        console.error("Error:", error.message);
      }
    );
  }, [isBudgetSiap, isLoading]);

  return {
    isLoading,
    isBudgetSiap,
    budgetSetupData,
    dispatch: (value) => setListAkun(value),
  };
}

function BudgetScreen() {
  // TODO: implemen dispatch & value pakai context => <BudgetSetupProvider /> ?
  const { isBudgetSiap, dispatch } = useBudgetSetup();

  // TODO: budget setup & pengecekan budget siap ini baiknya di provider authenticated app
  // biar gak ada flash form waktu lagi loading data
  if (!isBudgetSiap) {
    return <InitBudgetScreen onSimpanAkun={(data) => dispatch(data)} />;
  }
  return <ManajemenBudgetScreen />;
}

export { BudgetScreen };
