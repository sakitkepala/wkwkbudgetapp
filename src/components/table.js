import * as React from "react";
import { useTable, useGroupBy, useExpanded, useRowSelect } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Portal,
  Input,
  PopoverFooter,
  PopoverCloseButton,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  SunIcon,
} from "@chakra-ui/icons";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function KomponenTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        id: "expander",
        // Pakai ini buat kasih tombol "expand all":
        Header: ({ getToggleAllRowsExpandedProps }) => (
          <chakra.span {...getToggleAllRowsExpandedProps()}>
            <SunIcon />
          </chakra.span>
        ),
        Cell: ({ row }) =>
          row.canExpand && (
            <chakra.span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </chakra.span>
          ),
      },
      {
        Header: "Kategori",
        accessor: "kategori",
      },
      {
        Header: "Dianggarkan",
        accessor: "dianggarkan",
        isNumeric: true,
      },
      {
        Header: "Terpakai",
        accessor: "terpakai",
        isNumeric: true,
      },
      {
        Header: "Tersedia",
        accessor: "tersedia",
        isNumeric: true,
      },
    ],
    []
  );

  const datanyaTabel = React.useMemo(() => data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { data: datanyaTabel, columns },
    useGroupBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "seleksi",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((th) => (
              <Th {...th.getHeaderProps()} isNumeric={th.isNumeric}>
                {th.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map((tr) => {
          prepareRow(tr);
          return (
            <Tr {...tr.getRowProps()}>
              {tr.cells.map((td) => (
                <Td {...td.getCellProps()} isNumeric={td.column.isNumeric}>
                  {td.render("Cell")}{" "}
                  {td.column.id !== "dianggarkan" ? null : (
                    <EditorBugdetInline />
                  )}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function EditorBugdetInline() {
  const initialFocusRef = React.useRef();

  return (
    <Popover placement="top" initialFocusRef={initialFocusRef}>
      <PopoverTrigger>
        <Button size="sm">
          <EditIcon />
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent p="2" pt="6" bgColor="gray.200">
          <PopoverArrow bgColor="gray.200" />
          <PopoverBody>
            <Input
              ref={initialFocusRef}
              placeholder="misalnya... 1 000 000,00"
              bgColor="gray.100"
            />
          </PopoverBody>

          <PopoverFooter>
            <Button size="sm" colorScheme="green">
              Simpan
            </Button>
          </PopoverFooter>
          <PopoverCloseButton />
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

function TabelBudget({ data }) {
  return (
    <Box
      as="main"
      w="100%"
      pt="4"
      pb="12"
      borderRadius="md"
      shadow="base"
      bgColor="white"
    >
      <KomponenTable data={data} />
    </Box>
  );
}

const dataMock = [
  {
    kategori: "Makan",
    dianggarkan: 500000,
    terpakai: 50000,
    tersedia: 450000,
    subRows: [
      {
        kategori: "Matengan di warung",
        dianggarkan: 300000,
        terpakai: 50000,
        tersedia: 250000,
      },
      {
        kategori: "Stok makanan",
        dianggarkan: 200000,
        terpakai: 0,
        tersedia: 0,
      },
    ],
  },
  {
    kategori: "Transport",
    dianggarkan: 100000,
    terpakai: 22000,
    tersedia: 78000,
    subRows: [
      {
        kategori: "Bensin Pertalite",
        dianggarkan: 100000,
        terpakai: 22000,
        tersedia: 78000,
      },
    ],
  },
];

export { TabelBudget };
