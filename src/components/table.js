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
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useUpdateBudgetLine } from "../utils/budget-lines";

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

  const datanyaTabel = data;

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
                    <EditorBudgetInline line={td.row.original} />
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

function EditorBudgetInline({ line }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [inputBudget, setInputBudget] = React.useState(line.dianggarkan);
  const { mutate } = useUpdateBudgetLine();

  const initialFocusRef = React.useRef();

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    setInputBudget(line.dianggarkan);
  }, [isOpen, line.dianggarkan]);

  const onSubmitBudget = (ev) => {
    if (inputBudget !== line.dianggarkan) {
      mutate({ id: line.id, dianggarkan: inputBudget });
    }
    onClose();
  };

  return (
    <Popover
      placement="top"
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
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
              value={inputBudget}
              onChange={(ev) => {
                const formattedInput = Number(ev.target.value);
                setInputBudget(formattedInput);
              }}
            />
          </PopoverBody>

          <PopoverFooter>
            <Button size="sm" colorScheme="green" onClick={onSubmitBudget}>
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

export { TabelBudget };
