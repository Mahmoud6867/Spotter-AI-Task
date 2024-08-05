import "./App.css";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFitch";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "created_dt", label: "Created Date", minWidth: 170 },
  { id: "data_source_modified_dt", label: "Modified Date", minWidth: 170 },
  { id: "entity_type", label: "Entity Type", minWidth: 170 },
  { id: "operating_status", label: "Operating Status", minWidth: 170 },
  { id: "legal_name", label: "Legal Name", minWidth: 170 },
  { id: "dba_name", label: "DBA Name", minWidth: 170 },
  { id: "physical_address", label: "Physical Address", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "usdot_number", label: "USDOT Number", minWidth: 170 },
  { id: "mc_mx_ff_number", label: "MC/MX/FF Number", minWidth: 170 },
  { id: "power_units", label: "Power Units", minWidth: 170 },
  { id: "out_of_service_date", label: "Out of Service Date", minWidth: 170 },
];



function App() {
  const [data, setData] = useState<any[]>([]);
  const { fetchCsvData } = useFetch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchCsvData("/data/FMSCAData.csv", setData);
  }, []);

  console.log(data);

  return (
    <main>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </main>
  );
}

export default App;
