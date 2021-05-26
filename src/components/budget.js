import React from "react";
import { useQuery } from "react-query";
import { Box, Center, Grid, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { client } from "../utils";
import { useBudgetLine } from "../utils/budget-lines";
import { TabelBudget } from "./table";

function namaBulan(index) {
  const bulan = {
    11: "Desember",
  };
  return bulan[index];
}

function DisplayBulan({ budget, ...props }) {
  return (
    <Box
      className="display-bulan"
      textTransform="uppercase"
      fontSize="2xl"
      color="gray.300"
      {...props}
    >
      {namaBulan(typeof budget.bulan === "number" ? budget.bulan : 11)}
    </Box>
  );
}

function InfoDetail({ id }) {
  const line = useBudgetLine(id);

  return (
    <Box>
      <Text>...to be developed</Text>
      <Text>Info</Text>
      {id ? <Text>ID: {id}</Text> : "Line belum diseleksi."}

      {line.data && (
        <>
          <chakra.h1>{line.data.kategori}</chakra.h1>
          <Text>Dianggarkan: Rp {line.data.dianggarkan}</Text>
        </>
      )}
    </Box>
  );
}

function DaftarAlokasiAnggaran({ budget }) {
  const { data: budgetLines } = useQuery(
    ["budget-lines", `budget-${budget.id}`],
    async () => {
      try {
        return (await client(`/budget-line?budgetId=${budget.id}`)).data;
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      enabled: Boolean(budget),
    }
  );

  const [idDiseleksi, setIdDiseleksi] = React.useState(null);

  function onSeleksi(alokasiId) {
    setIdDiseleksi(alokasiId);
  }

  if (!budgetLines) {
    return (
      <Grid templateColumns="2fr 1fr" columnGap="16" mt="72px">
        <Center>
          <Box bgColor="white" p="26" borderRadius="md">
            Sedang menyiapkan tabel...
          </Box>
        </Center>
      </Grid>
    );
  }

  return (
    <Grid templateColumns="2fr 1fr" columnGap="16" mt="72px">
      {budgetLines.length > 0 ? (
        <TabelBudget
          data={budgetLines}
          lineDiseleksi={idDiseleksi}
          onSeleksi={onSeleksi}
        />
      ) : (
        <Center>
          <Box bgColor="white" p="26" borderRadius="md">
            Tidak ada data.
          </Box>
        </Center>
      )}

      <InfoDetail id={idDiseleksi} />
    </Grid>
  );
}

export { DisplayBulan, DaftarAlokasiAnggaran };
