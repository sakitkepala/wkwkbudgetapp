import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useBudgetLines } from "../utils/budget-lines";
import { TabelBudget } from "../components/table";

function BudgetLinesDataView({ bulan }) {
  const { isLoading, isError, error, budgetLines } = useBudgetLines();

  return (
    <Box display="flex" flexDirection="row-reverse" w="full" mt="72px" px="16">
      <Box
        as="aside"
        className="info"
        w="40%"
        px="40px"
        py="12px"
        color="gray.500"
      >
        <Text>To be developed...</Text>
        {/* {kontenInfoDetail} */}
      </Box>

      {isLoading ? (
        "Loading..."
      ) : isError ? (
        error.message
      ) : (
        <TabelBudget data={budgetLines} />
      )}
    </Box>
  );
}

export { BudgetLinesDataView };
