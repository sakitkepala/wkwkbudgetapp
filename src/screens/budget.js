import React from "react";
import { Box, Center, chakra } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { client } from "../utils";
import {
  DaftarAlokasiAnggaran,
  DialogInputBelanja,
  DisplayBulan,
} from "../components/budget";

function DisplayDanaBudget({ budget }) {
  const { jumlahDanaTersedia } = budget;

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

function BudgetScreen() {
  const { data: budget } = useQuery(["budget", "latest"], async () => {
    try {
      return (await client("/budget?latest=true")).data;
    } catch (error) {
      throw new Error(error);
    }
  });

  if (!budget) {
    return <Center h="100vh">Memuat screen...</Center>;
  }

  return (
    <Box mx="16">
      <Center flexDirection="column">
        <DisplayBulan mt="12" budget={budget} />
        <DisplayDanaBudget budget={budget} />
        <DialogInputBelanja budget={budget} />
      </Center>
      <DaftarAlokasiAnggaran budget={budget} />
    </Box>
  );
}

export { BudgetScreen };
