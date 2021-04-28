import * as React from "react";
import { Box, Center, chakra } from "@chakra-ui/react";
import { client as apiClient } from "../utils";
import { BudgetLinesDataView } from "../components/budget-line";

function DisplayBulan(props) {
  return (
    <Box
      className="display-bulan"
      textTransform="uppercase"
      fontSize="2xl"
      color="gray.300"
      {...props}
    >
      {props.children}
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

function ManajemenBudgetScreen() {
  const [budgetBulanIni, setBudgetBulanIni] = React.useState(null);

  // dummy
  const dataTerpakai = 0;

  React.useEffect(() => {
    if (Boolean(budgetBulanIni)) {
      return;
    }
    try {
      const resBudget = apiClient("/budget");
      resBudget.then((res) => {
        setBudgetBulanIni(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [budgetBulanIni]);

  return (
    <Box>
      <Center flexDirection="column">
        <DisplayBulan mt="12">
          {!budgetBulanIni ? "Bulan..." : budgetBulanIni.bulan}
        </DisplayBulan>
        <DisplayBajet>
          {!budgetBulanIni
            ? null
            : budgetBulanIni.danaDianggarkan - dataTerpakai}
        </DisplayBajet>
      </Center>

      <BudgetLinesDataView bulan="Desember" />
    </Box>
  );
}

export { ManajemenBudgetScreen };
