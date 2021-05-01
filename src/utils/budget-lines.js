import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../utils";

function useBudgetLines() {
  // TODO: ["budget-lines", bulan]
  const queryInfo = useQuery(["budget-lines", "Desember"], async () => {
    try {
      // dummy hardcoded endpoint
      // TODO: abstraksikan, misal: `/budgetLine/${bulan}`
      const respon = await client("/budgetLine?bulan=Desember");
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  return { ...queryInfo, budgetLines: queryInfo.data };
}

function useUpdateBudgetLine() {
  const queryClient = useQueryClient();

  const mutationInfo = useMutation(
    async (updatedLine) => {
      try {
        const respon = await client(`/budgetLine/${updatedLine.id}`, {
          method: "PUT",
          data: updatedLine,
        });
        return respon.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      // Memperbarui cache data budget lines supaya komponen yang
      // pakai data ini render ulang dengan data yang baru
      onSuccess: (updatedLine) => {
        const budgetLinesKey = ["budget-lines", "Desember"];
        const linesData = queryClient.getQueryData(budgetLinesKey);

        queryClient.setQueryData(
          budgetLinesKey,
          linesData.map((line) =>
            line.id === updatedLine.id ? updatedLine : line
          )
        );
      },
    }
  );
  return mutationInfo;
}

export { useBudgetLines, useUpdateBudgetLine };
