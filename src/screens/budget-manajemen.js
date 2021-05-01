import * as React from "react";
import { Box, Center, chakra } from "@chakra-ui/react";
import { BudgetLinesDataView } from "../components/budget-line";
import { useDanaBulanIni } from "../utils/dana-lines";
import { useBudgetLines } from "../utils/budget-lines";
import { useDanaBudget } from "../utils/budget-dana";

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

const totalByField = (arr, fieldJumlah) => {
  return arr.reduce((total, line) => total + line[fieldJumlah], 0);
};

function namaBulan(bulan) {
  switch (bulan) {
    // ...
    case 11:
      return "Desember";

    // ...

    default:
      console.error("Bulan gak disupport");
  }
}

/**
 * Screen manajemen budget menampilkan informasi untuk budgeting tiap bulannya,
 * sehingga data yang tampil adalah data budgeting untuk bulan ini.
 *
 * Data dan state yang dibutuhkan untuk menampilkan UI di sini:
 * 1. sekarang bulan apa?
 * 2. berapa dana yang tersedia untuk budgeting?
 * 3. apa saja yang dibudget untuk bulan ini?
 * ...
 */
const hariIni = new Date();
const tahun = 2021 || hariIni.getFullYear();
const bulan = 11 || hariIni.getMonth();

function ManajemenBudgetScreen() {
  // Tiap perubahan tanggal akan dicek bulannya:
  // ...apakah sudah ada budgeting untuk bulan ini.

  const danaLines = useDanaBulanIni();
  const budgetLines = useBudgetLines();
  const [{ sisa: danaTersedia }, { setTotal, setTerpakai }] = useDanaBudget();

  React.useEffect(() => {
    if (!danaLines.data || danaLines.isPreviousData) {
      return;
    }
    const totalDana = totalByField(danaLines.data, "jumlah");
    setTotal(totalDana);
  }, [setTotal, danaLines.isPreviousData, danaLines.data]);

  React.useEffect(() => {
    if (!budgetLines.data || budgetLines.isPreviousData) {
      return;
    }
    const totalAnggaran = totalByField(budgetLines.data, "dianggarkan");
    setTerpakai(totalAnggaran);
  }, [setTerpakai, budgetLines.isPreviousData, budgetLines.data]);

  return (
    <Box>
      <Center flexDirection="column">
        <DisplayBulan mt="12">{namaBulan(bulan)}</DisplayBulan>
        <DisplayBajet>{danaTersedia}</DisplayBajet>
      </Center>

      <BudgetLinesDataView budgetLines={budgetLines} bulan="Desember" />
    </Box>
  );
}

export { ManajemenBudgetScreen };
