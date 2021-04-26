import * as React from "react";
import { client as apiClient } from "../utils";
import {
  Box,
  Center,
  chakra,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { TabelBudget } from "../components/table";

function DisplayBulan(props) {
  return (
    <Box
      className="display-bulan"
      textTransform="uppercase"
      fontSize="2xl"
      color="gray.300"
      {...props}
    >
      &larr; {props.children} &rarr;
    </Box>
  );
}

function DisplayBajet(props) {
  return (
    <Box
      p="12"
      mt="12"
      // bgColor="whiteAlpha.500"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="sm"
      // shadow="base"
      fontSize="4xl"
      fontWeight="bold"
      color="gray.500"
    >
      <chakra.span fontWeight="normal" color="gray.300">
        Rp
      </chakra.span>{" "}
      {props.children}
      <chakra.span fontWeight="normal" color="gray.300">
        ,00
      </chakra.span>
    </Box>
  );
}

function ManajemenBudget() {
  const [budget, setBudget] = React.useState(null);
  const [budgetLines, setBudgetLines] = React.useState(null);

  // dummy
  const dataTerpakai = 0;

  React.useEffect(() => {
    if (Boolean(budget)) {
      return;
    }

    try {
      const resBudget = apiClient("/budget");
      resBudget.then((res) => {
        setBudget(res.data);
      });
    } catch (error) {
      console.log(error);
      // TODO: handle state error
    }
  }, [budget]);

  React.useEffect(() => {
    if (Boolean(budgetLines) || !budget) {
      return;
    }

    try {
      const resLines = apiClient(`/budgetLine/${budget.bulan}`);
      resLines.then((respon) => {
        setBudgetLines(respon.data);
      });
    } catch (error) {
      console.log(error);
      // TODO: handle state error
    }
  }, [budget, budgetLines]);

  return (
    <Box>
      <Center flexDirection="column">
        <DisplayBulan mt="12">
          {!budget ? "Bulan..." : budget.bulan}
        </DisplayBulan>
        <DisplayBajet>
          {!budget ? null : budget.danaDianggarkan - dataTerpakai}
        </DisplayBajet>
      </Center>

      <Box
        display="flex"
        flexDirection="row-reverse"
        w="full"
        mt="72px"
        px="16"
      >
        <Box
          as="aside"
          className="info"
          w="40%"
          px="40px"
          py="12px"
          color="gray.500"
        >
          <Heading as="h2" size="md">
            {!budgetLines ? "" : budgetLines[0].kategori}
          </Heading>
          <Text mt="1em">{!budgetLines ? "" : budgetLines[0].kategori}</Text>

          <Table variant="simple" size="sm" colorScheme="gray" mt="1em">
            <Tbody>
              <Tr>
                <Td>Dianggarkan</Td>
                <Td isNumeric align="right">
                  Rp {!budgetLines ? 0 : budgetLines[0].dianggarkan},00
                </Td>
              </Tr>
              <Tr>
                <Td>Dibelanjakan</Td>
                <Td isNumeric align="right">
                  Rp {!budgetLines ? 0 : budgetLines[0].terpakai},00
                </Td>
              </Tr>
              <Tr>
                <Td>Tersisa</Td>
                <Td isNumeric align="right">
                  Rp 0,00
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        {!budgetLines ? "Loading..." : <TabelBudget data={budgetLines} />}
      </Box>
    </Box>
  );
}

export { ManajemenBudget };
