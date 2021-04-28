import React from "react";
import {
  Box,
  Text,
  // Heading, Table, Tbody, Td, Tr
} from "@chakra-ui/react";
import { client } from "../utils";
import { TabelBudget } from "../components/table";

function BudgetLinesDataView({ bulan }) {
  const [budgetLines, setBudgetLines] = React.useState(null);

  React.useEffect(() => {
    if (Boolean(budgetLines)) {
      return;
    }
    try {
      const resLines = client(`/budgetLine/${bulan || "Desember"}`);
      resLines.then((respon) => {
        setBudgetLines(respon.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [bulan, budgetLines]);

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

      {!budgetLines ? "Loading..." : <TabelBudget data={budgetLines} />}
    </Box>
  );
}

// const kontenInfoDetail = [
//   <Heading as="h2" size="md">
//     {!budgetLines ? "" : budgetLines[0].kategori}
//   </Heading>,
//   <Text mt="1em">{!budgetLines ? "" : budgetLines[0].kategori}</Text>,
//   <Table variant="simple" size="sm" colorScheme="gray" mt="1em">
//     <Tbody>
//       <Tr>
//         <Td>Dianggarkan</Td>
//         <Td isNumeric align="right">
//           Rp {!budgetLines ? 0 : budgetLines[0].dianggarkan},00
//         </Td>
//       </Tr>
//       <Tr>
//         <Td>Dibelanjakan</Td>
//         <Td isNumeric align="right">
//           Rp {!budgetLines ? 0 : budgetLines[0].terpakai},00
//         </Td>
//       </Tr>
//       <Tr>
//         <Td>Tersisa</Td>
//         <Td isNumeric align="right">
//           Rp 0,00
//         </Td>
//       </Tr>
//     </Tbody>
//   </Table>,
// ];

export { BudgetLinesDataView };
