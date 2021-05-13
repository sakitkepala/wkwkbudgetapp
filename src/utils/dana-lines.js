import { useQuery } from "react-query";
import { client } from "../utils";

function useSearchDanaLines(field, query) {
  const queryInfo = useQuery(
    [`dana-line-by-${field}`, `${query}`],
    async () => {
      try {
        const respon = await client(`/dana-line?${field}=${query}`);
        return respon.data;
      } catch (error) {
        throw new Error(error);
      }
    }
  );
  return queryInfo;
}

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

export { useSearchDanaLines, useDanaBulanIni };
