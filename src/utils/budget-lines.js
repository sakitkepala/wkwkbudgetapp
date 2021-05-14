import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../utils";

function useSearchBudgetLines(field, query) {
  const queryInfo = useQuery(
    [`budget-lines-by-${field}`, `${query}`],
    async () => {
      try {
        const respon = await client(`/budget-line?${field}=${query}`);
        return respon.data;
      } catch (error) {
        throw new Error(error);
      }
    }
  );
  return queryInfo;
}

function useBudgetLine(id) {
  const line = useQuery(["budget-line", id], async () => {
    try {
      const respon = await client(`/budget-line/${id}`);
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  return line;
}

function useUpdateBudgetLine() {
  const queryClient = useQueryClient();

  const mutationInfo = useMutation(
    async (updatedLine) => {
      try {
        const respon = await client(`/budget-line/${updatedLine.id}`, {
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
        // TODO: ini perbaiki key sama query-nya, karena udah gak sinkron
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

export { useBudgetLine, useSearchBudgetLines, useUpdateBudgetLine };
