"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { green, red } from "@mui/material/colors";
import NewMember from "@/components/members_/NewMember";
import { useRouter } from "next/navigation";

export default function Members() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [isPublic, setIsPublic] = React.useState("");
  const router = useRouter();

  const debouncedFetch = React.useMemo(
    () =>
      debounce((paginationModel, name, surname, isPublic) => {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`
        );
        url.pathname += "views/members/";
        url.searchParams.set("page", String(paginationModel.page));
        url.searchParams.set("pageSize", String(paginationModel.pageSize));
        if (name.length > 0) url.searchParams.set("name", name);
        if (surname.length > 0) url.searchParams.set("surname", surname);
        if (isPublic.length > 0) url.searchParams.set("is_public", isPublic);

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setRows(data.rows);
            setRowCount(data.rowCount);
            setIsLoading(false);
          })
          .catch((err) => {
            setRows([]);
            setRowCount(0);
            setIsLoading(false);
            console.log(err);
          });

        setIsLoading(true);
      }, 400),
    [] // only create once
  );

  React.useEffect(() => {
    debouncedFetch(paginationModel, name, surname, isPublic);
  }, [paginationModel, name, surname, isPublic, debouncedFetch]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Ime",
      flex: 1,
      align: "center",
      headerAlign: "center",
      filterable: false,
    },
    {
      field: "surname",
      headerName: "Prezime",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date_of_joining",
      headerName: "Datum upisa",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("sr-Latn-RS", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      field: "is_public",
      headerName: "Objavljen",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.value === 1 ? (
          <CheckCircleIcon sx={{ color: green[500] }} />
        ) : (
          <CancelIcon sx={{ color: red[500] }} />
        );
      },
    },
  ];

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    const identifier = params.row.identifier;
    router.push(`/protected/members/${identifier}`);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "95%" }}
      >
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Ime"
            variant="standard"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="surname"
            label="Prezime"
            variant="standard"
            size="small"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="is-public-label"></InputLabel>
            <Select
              labelId="is-public-label"
              id="is-public"
              label="Objavljen"
              size="small"
              variant="standard"
              displayEmpty
              value={isPublic}
              onChange={(e) => {
                setIsPublic(e.target.value);
              }}
            >
              <MenuItem value="">Svi</MenuItem>
              <MenuItem value="1">Objavljen</MenuItem>
              <MenuItem value="0">Neobjavljen</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <NewMember></NewMember>
        </Box>
      </Box>

      <div style={{ minHeight: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          loading={isLoading}
          pageSizeOptions={[5, 10, 15]}
          paginationModel={paginationModel}
          paginationMode="server"
          disableColumnFilter
          disableColumnSorting
          onPaginationModelChange={setPaginationModel}
          onRowClick={handleRowClick}
          getRowId={(row) => row.identifier}
          sx={{
            justifyContent: "center",
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
            "& .MuiDataGrid-columnHeader:active": {
              backgroundColor: "inherit",
            },
          }}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          disableColumnSelector={true}
          disableColumnMenu={true}
        />
      </div>
    </>
  );
}
