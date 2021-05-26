import React from "react";
import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { client } from "../utils";
import { DaftarAlokasiAnggaran, DisplayBulan } from "../components/budget";

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
  total: 0, // dari total semua dana akun yang ditampung
  dipakai: 0, // dari total jumlah alokasi di semua kategori
  sisa: 0, // nilai turunan yang berguna sebagai indikator untuk user
};

function DisplayDanaBudget({ budget }) {
  const { data: danaLines } = useQuery(
    ["dana-lines", `budget-${budget.id}`],
    async () => {
      try {
        return (await client(`/dana-line?budgetId=${budget.id}`)).data;
      } catch (error) {
        throw new Error(error);
      }
    },
    { enabled: Boolean(budget) }
  );

  const { data: budgetLines } = useQuery(
    ["budget-lines", `budget-${budget.id}`],
    async () => {
      try {
        return (await client(`/budget-line?budgetId=${budget.id}`)).data;
      } catch (error) {
        throw new Error(error);
      }
    },
    { enabled: Boolean(budget) }
  );

  const [dana, dispatch] = React.useReducer(reducerDanaBudget, danaAwal);
  const jumlahDanaTersedia = dana.sisa;

  React.useEffect(() => {
    if (!danaLines) {
      return;
    }

    const totalDana = totalByField(danaLines, "jumlah");
    dispatch({ type: "TOTAL", total: totalDana });
  }, [dana, danaLines]);

  React.useEffect(() => {
    if (!budgetLines) {
      return;
    }

    const totalBudget = totalByField(budgetLines, "dianggarkan");
    dispatch({ type: "DIPAKAI", dipakai: totalBudget });
  }, [dana, budgetLines]);

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

function ModalBelanja({ budgetId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const belanja = useMutation(async (belanjaBaru) => {
    try {
      const respon = await client("/belanja", {
        method: "POST",
        data: belanjaBaru,
      });
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });

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
      budgetId,
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

function BudgetScreen() {
  const { data: budget } = useQuery(["budget", "latest"], async () => {
    try {
      return (await client("/budget?latest=true")).data;
    } catch (error) {
      throw new Error(error);
    }
  });

  if (!budget) {
    return <Center>Memuat screen...</Center>;
  }

  return (
    <Box mx="16">
      <Center flexDirection="column">
        <DisplayBulan mt="12" budget={budget} />
        <DisplayDanaBudget budget={budget} />

        <ModalBelanja budget={budget} />
      </Center>

      <DaftarAlokasiAnggaran budget={budget} />
    </Box>
  );
}

const totalByField = (arr, fieldJumlah) => {
  return arr.length > 0
    ? arr.reduce((total, line) => total + line[fieldJumlah], 0)
    : 0;
};

export { BudgetScreen };
