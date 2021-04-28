import { useQuery } from "react-query";
import { client } from "../utils";

function useBudgetBulanIni() {
  const queryInfo = useQuery(["budget-default"], async () => {
    try {
      const respon = await client("/budget");
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  return queryInfo;
}

export { useBudgetBulanIni };
