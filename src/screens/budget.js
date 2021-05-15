import React from "react";
import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
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
  total: 0, // dari total semua dana akun yang ditampung
  dipakai: 0, // dari total jumlah alokasi di semua kategori
  sisa: 0, // nilai turunan yang berguna sebagai indikator untuk user
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
        <ModalBelanja budgetId={budget.id} />
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
