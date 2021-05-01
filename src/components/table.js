import * as React from "react";
import { useTable, useGroupBy, useExpanded, useRowSelect } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon, SunIcon } from "@chakra-ui/icons";
import { EditorInlineBudget } from "./editor-inline-budget";

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

function CellDanaTersedia({ dianggarkan = 0, terpakai = 0 }) {
  const danaTersedia = dianggarkan - terpakai;
  return <span>{danaTersedia}</span>;
}

function KontainerTabel({ children }) {
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
      {children}
    </Box>
  );
}

function TabelBudget({ data }) {
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
        Cell: ({ row }) => {
          const { dianggarkan, terpakai } = row.values;
          return (
            <CellDanaTersedia dianggarkan={dianggarkan} terpakai={terpakai} />
          );
        },
      },
    ],
    []
  );

  const konfigTabel = { data, columns };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(konfigTabel, useGroupBy, useExpanded, useRowSelect, (hooks) => {
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
  });

  return (
    <KontainerTabel>
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
                      <EditorInlineBudget line={td.row.original} ml="2" />
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </KontainerTabel>
  );
}

export { TabelBudget };
