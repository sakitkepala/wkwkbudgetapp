import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Box, Center, Grid, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { client } from "../utils";
import { useBudgetLine } from "../utils/budget-lines";
import { TabelBudget } from "./table";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { Input } from "@chakra-ui/input";

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

function DialogInputBelanja({ budget }) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const belanja = useMutation(
    async (belanjaBaru) => {
      try {
        const respon = await client("/belanja", {
          method: "POST",
          data: belanjaBaru,
        });
        return respon.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["budget", "latest"]);
        queryClient.invalidateQueries(["budget-lines", `budget-${budget.id}`]);
      },
    }
  );

  const listKategori = useQuery(["kategori-list"], async () => {
    try {
      const respon = await client(`/kategori`);
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  const [inputNama, setInputNama] = React.useState("");
  const [inputKategoriId, setInputKategoriId] = React.useState("");
  const [inputJumlah, setInputJumlah] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    setInputNama("");
    setInputKategoriId("");
    setInputJumlah("");
  }, [isOpen]);

  function onSeleksiKategori(ev) {
    setInputKategoriId(ev.target.value);
  }

  function onSubmitBelanja(ev) {
    ev.preventDefault();
    if (!inputNama || !inputKategoriId || !inputJumlah) {
      console.error("ada yang kosong");
      return;
    }

    belanja.mutate({
      nama: inputNama,
      kategoriId: inputKategoriId,
      jumlah: inputJumlah,
      budgetId: budget.id,
    });
    onClose();
  }

  return (
    <>
      <Button mt="4" colorScheme="telegram" onClick={onOpen}>
        + Belanja
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <form onSubmit={onSubmitBelanja}>
            <ModalBody mt="10">
              <FormControl>
                <Select
                  id="kategori"
                  name="kategori"
                  value={inputKategoriId}
                  placeholder="Kategori belanja"
                  onChange={onSeleksiKategori}
                >
                  {listKategori.data ? (
                    listKategori.data.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.nama}
                      </option>
                    ))
                  ) : (
                    <option>Sedang memuat kategori...</option>
                  )}
                </Select>
              </FormControl>

              <FormControl>
                <Input
                  id="nama"
                  name="nama"
                  bgColor="gray.100"
                  value={inputNama}
                  placeholder="Deskripsi belanja..."
                  onChange={(ev) => {
                    setInputNama(ev.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <Input
                  id="jumlah"
                  name="jumlah"
                  bgColor="gray.100"
                  value={inputJumlah}
                  placeholder="Jumlah"
                  onChange={(ev) => {
                    setInputJumlah(ev.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Simpan
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
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
          budgetLines={budgetLines}
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

export { DisplayBulan, DaftarAlokasiAnggaran, DialogInputBelanja };
