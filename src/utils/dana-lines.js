import { useQuery } from "react-query";
import { client } from "../utils";

function useDanaBulanIni() {
  const queryInfo = useQuery(["dana-bulan-ini"], async () => {
    try {
      const responBudget = await client("/budget/bulan-ini");
      const respon = await client(
        `/dana-line?budgetId=${responBudget.data.id}`
      );
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });
  return queryInfo;
}

export { useDanaBulanIni };
