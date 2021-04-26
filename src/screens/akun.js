import React from "react";
import { client as apiClient } from "../utils";
import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

function AkunDanaScreen() {
  const [dataAkun, setDataAkun] = React.useState(null);

  React.useEffect(() => {
    if (dataAkun) {
      return;
    }

    apiClient("/akun").then(
      (respon) => {
        setDataAkun(respon.data);
      },
      (error) => {
        console.log("Tidak ada data. Pesan error:", error.message);
      }
    );
  }, [dataAkun]);

  return (
    <Flex direction="column" alignItems="center">
      <Box
        as="main"
        width="60%"
        mt="24"
        pb="12"
        borderRadius="md"
        shadow="base"
        bgColor="white"
      >
        <Button m="8">+ Tambah Akun</Button>

        <Table>
          <Thead>
            <Tr>
              <Th>Akun</Th>
              <Th>Jenis Akun</Th>
              <Th isNumeric>Dana</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataAkun?.map(({ id, nama, jenis, dana }) => (
              <Tr key={id}>
                <Td>{nama}</Td>
                <Td>{jenis}</Td>
                <Td isNumeric>{dana}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {!dataAkun || dataAkun.length === 0 ? (
          <Center flexDir="column" h="250px">
            <Text color="gray.500">Belum punya akun. Buat dulu ya.</Text>
            <Button m="8">+ Buat Akun</Button>
          </Center>
        ) : null}
      </Box>
    </Flex>
  );
}

export { AkunDanaScreen };
