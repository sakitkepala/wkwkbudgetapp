import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { TabelBudget } from "../components/table";

function InfoDetail() {
  return (
    <Box
      as="aside"
      className="info"
      w="40%"
      px="40px"
      py="12px"
      color="gray.500"
    >
      <Text>To be developed...</Text>
      {/* TODO: {kontenInfoDetail} */}
    </Box>
  );
}

function KontainerLoading({ children }) {
  return (
    <Box
      as="main"
      w="100%"
      p="12"
      borderRadius="md"
      shadow="base"
      bgColor="white"
      textAlign="center"
    >
      {children}
    </Box>
  );
}

function KontainerError({ children }) {
  return (
    <Box
      as="main"
      w="100%"
      p="12"
      borderRadius="md"
      shadow="base"
      bgColor="white"
      textAlign="center"
    >
      <pre>{children}</pre>
    </Box>
  );
}

function BudgetLinesDataView({ budgetLines }) {
  const { isLoading, isError, error, data } = budgetLines;

  return (
    <Box display="flex" w="full" mt="72px" px="16">
      {isLoading ? (
        <KontainerLoading>Loading...</KontainerLoading>
      ) : isError ? (
        <KontainerError>
          {error?.message || "Ada error, tidak bisa tarik datanya."}
        </KontainerError>
      ) : (
        <TabelBudget data={data} />
      )}
      <InfoDetail />
    </Box>
  );
}

export { BudgetLinesDataView };
