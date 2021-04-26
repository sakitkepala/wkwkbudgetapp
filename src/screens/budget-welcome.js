import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React from "react";

function InitialBudget({ onSimpanAkun }) {
  const [jenisAkun, setJenisAkun] = React.useState(null);
  const [namaAkun, setNamaAkun] = React.useState("");
  const [namaBankTerakhir, setBankTerakhir] = React.useState("");

  return (
    <Flex flexDirection="column" alignItems="center" pt="24">
      <Text w="600px" color="gray.500">
        Hai! Kamu butuh akun dulu buat siapkan dana, nih, sebelum bisa
        budgeting. Kamu bisa tambahkan akun lewat form di bawah.
      </Text>

      <Box
        w="600px"
        mt="12"
        p="12"
        pt="8"
        rounded="md"
        shadow="base"
        bgColor="white"
      >
        <FormControl as="fieldset" isRequired>
          <RadioGroup
            id="akun-jenis"
            name="akun-jenis"
            value={jenisAkun}
            onChange={(val) => {
              setJenisAkun(val);
              if (val === "tunai") {
                setNamaAkun("Tunai");
              } else {
                setNamaAkun(namaBankTerakhir);
              }
            }}
          >
            <Stack direction="row">
              <Radio value="bank">Bank</Radio>
              <Radio value="tunai">Tunai</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl as="fieldset">
          <Input
            id="akun-nama"
            name="akun-nama"
            isDisabled={jenisAkun === "tunai"}
            variant={jenisAkun === "tunai" ? "filled" : "outline"}
            value={namaAkun}
            onChange={(ev) => {
              setNamaAkun(ev.target.value);
              if (jenisAkun === "bank") {
                setBankTerakhir(ev.target.value);
              }
            }}
            placeholder="misal... Jenius"
          />
        </FormControl>

        <FormControl as="fieldset">
          <Input
            id="akun-dana"
            name="akun-dana"
            placeholder="Rp ..."
            onKeyDown={(ev) => {
              if (
                ev.key === "Enter" ||
                ev.code === "Enter" ||
                ev.keyCode === "13"
              ) {
                // Submit
                const data = {
                  jenis: jenisAkun,
                  nama: namaAkun,
                  dana: ev.target.value,
                };
                console.log("submit enter gan");
                console.log("data", data);

                // mock: masuk ke screen Manajemen Budget
                onSimpanAkun((ori) => (ori ? [...ori, namaAkun] : [namaAkun]));
              }
            }}
          />
        </FormControl>
      </Box>
    </Flex>
  );
}

export { InitialBudget };
