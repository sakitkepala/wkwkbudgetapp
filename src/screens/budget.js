import React from "react";
import { Box, Center, chakra, Grid, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { client } from "../utils";
import { useBudgetLines } from "../utils/budget-lines";
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
      {props.children}
    </Box>
  );
}

function DisplayDanaBudget({ danaLines, budgetLines }) {
  return (
    <Box
      py="12"
      px="8"
      mt="12"
      bgColor="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      shadow="base"
      fontSize="4xl"
      fontWeight="bold"
      color="gray.500"
    >
      <chakra.span fontWeight="normal" color="gray.300">
        Rp
      </chakra.span>{" "}
      0
      <chakra.span fontWeight="normal" color="gray.300">
        ,00
      </chakra.span>
    </Box>
  );
}

function InfoDetail({ id }) {
  return (
    <Box>
      <Text>Info (to be developed)</Text>
      {id ? <Text>ID: {id}</Text> : "Line belum diseleksi."}
    </Box>
  );
}

function EditorAlokasiAnggaran({ budgetId }) {
  const { data } = useBudgetLines(budgetId);
  const [idDiseleksi, setIdDiseleksi] = React.useState(null);

  function onSeleksi(alokasiId) {
    setIdDiseleksi(alokasiId);
  }

  return (
    <Grid templateColumns="2fr 1fr" columnGap="16" mt="72px">
      {data ? (
        data?.length > 0 ? (
          <TabelBudget data={data} onSeleksi={onSeleksi} />
        ) : (
          <Center>
            <Box bgColor="white" p="26" borderRadius="md">
              Tidak ada data.
            </Box>
          </Center>
        )
      ) : (
        <Center>
          <Box bgColor="white" p="26" borderRadius="md">
            Sedang siap-siap...
          </Box>
        </Center>
      )}

      <InfoDetail id={idDiseleksi} />
    </Grid>
  );
}

const bulan = getBulan(11);

function BudgetScreen() {
  const { data: budget, isLoading } = useBudget();

  if (isLoading) {
    return <Center>Sedang siap-siap...</Center>;
  }

  return (
    <Box>
      <Center flexDirection="column">
        <DisplayBulan mt="12">{budget.bulan || namaBulan(bulan)}</DisplayBulan>
        <DisplayDanaBudget />
      </Center>

      <EditorAlokasiAnggaran budgetId={budget.id} />
    </Box>
  );
}

function getBulan(dummyBulan) {
  return dummyBulan || new Date().getMonth();
}

function namaBulan(bulan) {
  switch (bulan) {
    case 11:
      return "Desember";
    default:
      console.error("Bulan gak disupport");
  }
}

function useBudget() {
  const budget = useQuery(["budget-default"], async () => {
    try {
      const responBudget = await client("/budget");
      return responBudget.data;
    } catch (error) {
      throw new Error(error);
    }
  });
  return budget;
}

// const totalByField = (arr, fieldJumlah) => {
//   return arr.length > 0
//     ? arr.reduce((total, line) => total + line[fieldJumlah], 0)
//     : 0;
// };

export { BudgetScreen };
