import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

const akunDummy = [
  { id: 1, nama: "BCA", jenis: "Bank", dana: 4000000 },
  { id: 2, nama: "Tunai", jenis: "Tunai", dana: 500000 },
];

// const akunDummy = [];

function AkunDanaScreen() {
  return (
    <Flex direction="column" alignItems="center">
      <Box
        as="main"
        width="60%"
        mt="24"
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
            {akunDummy?.map(({ id, nama, jenis, dana }) => (
              <Tr key={id}>
                <Td>{nama}</Td>
                <Td>{jenis}</Td>
                <Td isNumeric>{dana}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {akunDummy.length === 0 ? (
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
