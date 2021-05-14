import React from "react";
import { Box, Center, chakra, Grid, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { client } from "../utils";
import { useSearchDanaLines } from "../utils/dana-lines";
import { useBudgetLine, useSearchBudgetLines } from "../utils/budget-lines";
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

function reducerDanaBudget(state, action) {
  const { total, dipakai } = action;

  switch (action.type) {
    case "TOTAL":
      if (total === state.total) {
        return state;
      }
      return { ...state, total, sisa: total - state.dipakai };

    case "DIPAKAI":
      if (dipakai === state.dipakai) {
        return state;
      }
      return { ...state, dipakai, sisa: state.total - dipakai };

    default:
      console.error("Tipe dispatch gak disupport.");
      return state;
  }
}

const danaAwal = {
  total: 0,
  dipakai: 0,
  sisa: 0,
};

function DisplayDanaBudget({ budgetId }) {
  const danaLines = useSearchDanaLines("budgetId", budgetId);
  const budgetLines = useSearchBudgetLines("budgetId", budgetId);

  const [dana, dispatch] = React.useReducer(reducerDanaBudget, danaAwal);
  const jumlahDanaTersedia = dana.sisa;

  React.useEffect(() => {
    if (!danaLines.data) {
      return;
    }

    const totalDana = totalByField(danaLines.data, "jumlah");
    dispatch({ type: "TOTAL", total: totalDana });
  }, [dana, danaLines.data]);

  React.useEffect(() => {
    if (!budgetLines.data) {
      return;
    }

    const totalBudget = totalByField(budgetLines.data, "dianggarkan");
    dispatch({ type: "DIPAKAI", dipakai: totalBudget });
  }, [dana, budgetLines.data]);

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
      <chakra.span>{jumlahDanaTersedia}</chakra.span>
      <chakra.span fontWeight="normal" color="gray.300">
        ,00
      </chakra.span>
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

function DaftarAlokasiAnggaran({ budgetId }) {
  const budgetLines = useSearchBudgetLines("budgetId", budgetId);
  const [idDiseleksi, setIdDiseleksi] = React.useState(null);

  function onSeleksi(alokasiId) {
    setIdDiseleksi(alokasiId);
  }

  return (
    <Grid templateColumns="2fr 1fr" columnGap="16" mt="72px">
      {budgetLines.data ? (
        budgetLines.data?.length > 0 ? (
          <TabelBudget
            data={budgetLines.data}
            lineDiseleksi={idDiseleksi}
            onSeleksi={onSeleksi}
          />
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
            Sedang menyiapkan tabel...
          </Box>
        </Center>
      )}

      <InfoDetail id={idDiseleksi} />
    </Grid>
  );
}

const bulan = getBulan(11);

function BudgetScreen() {
  const { data: budget, isLoading } = useBudgetLatest();

  if (isLoading) {
    return <Center>Memuat screen...</Center>;
  }

  return (
    <Box mx="16">
      <Center flexDirection="column">
        <DisplayBulan mt="12">{budget.bulan || namaBulan(bulan)}</DisplayBulan>
        <DisplayDanaBudget budgetId={budget.id} />
      </Center>

      <DaftarAlokasiAnggaran budgetId={budget.id} />
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

function useBudgetLatest() {
  const budget = useQuery(["budget-default"], async () => {
    try {
      const responBudget = await client("/budget?latest=true");
      return responBudget.data;
    } catch (error) {
      throw new Error(error);
    }
  });
  return budget;
}

const totalByField = (arr, fieldJumlah) => {
  return arr.length > 0
    ? arr.reduce((total, line) => total + line[fieldJumlah], 0)
    : 0;
};

export { BudgetScreen };
