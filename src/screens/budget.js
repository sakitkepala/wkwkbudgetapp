import React from "react";
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

const totalByField = (arr, fieldJumlah) => {
  return arr.length > 0
    ? arr.reduce((total, line) => total + line[fieldJumlah], 0)
    : 0;
};

function DisplayDanaBudget({ danaLines, budgetLines }) {
  const dana = useDanaBudget();

  React.useEffect(() => {
    if (!danaLines.data) {
      return;
    }
    const totalDana = totalByField(danaLines.data, "jumlah");
    dana.setTotal(totalDana);
  }, [dana, danaLines.data]);

  React.useEffect(() => {
    if (!budgetLines.data) {
      return;
    }
    const totalBudget = totalByField(budgetLines.data, "dianggarkan");
    dana.setTerpakai(totalBudget);
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
      {dana.sisa}
      <chakra.span fontWeight="normal" color="gray.300">
        ,00
      </chakra.span>
    </Box>
  );
}

function namaBulan(bulan) {
  switch (bulan) {
    case 11:
      return "Desember";
    default:
      console.error("Bulan gak disupport");
  }
}

function getBulan(dummyBulan) {
  return dummyBulan || new Date().getMonth();
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

function BudgetScreen() {
  // Tiap render bisa secara otomatis dapat data Date bulan dan tahun sekarang
  // dengan menginstansiasi objek Date. Kemudian, karena requirement saat ini
  // belum perlu mengelola bulan & tahun saat ini sebagai state karena tidak ada
  // kondisi untuk mengubah state tersebut di renderan saat ini, jadi hook di
  // bawah bisa dengan aman mengasumsikan date saat ini langsung dari inisiasi
  // objek `Date()` saja.
  const danaLines = useDanaBulanIni();
  const budgetLines = useBudgetLines();

  const bulan = getBulan(11);

  return (
    <Box>
      <Center flexDirection="column">
        <DisplayBulan mt="12">{namaBulan(bulan)}</DisplayBulan>
        <DisplayDanaBudget danaLines={danaLines} budgetLines={budgetLines} />
      </Center>
      <BudgetLinesDataView budgetLines={budgetLines} />
    </Box>
  );
}

export { BudgetScreen };
