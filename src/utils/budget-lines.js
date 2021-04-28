import { useQuery } from "react-query";
import { client } from "../utils";

function useBudgetLines() {
  // TODO: ["budget-lines", bulan]
  const queryInfo = useQuery(["budget-lines", "Desember"], async () => {
    try {
      // dummy hardcoded endpoint
      // TODO: abstraksikan, misal: `/budgetLine/${bulan}`
      const respon = await client("/budgetLine/Desember");
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  return { ...queryInfo, budgetLines: queryInfo.data };
}

export { useBudgetLines };
