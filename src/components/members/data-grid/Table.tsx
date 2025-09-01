"use client"
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import React from "react";
import useSelectMembersView from "@components/members/hooks/useSelectMembersView";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { green, red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { PaginationModel, TableProps } from "@components/members/types";

export default function Table({formState}:TableProps) {
  const router = useRouter();
  const { rows, rowCount, isLoading, debouncedFetch } = useSelectMembersView();
  const [paginationModel, setPaginationModel] = React.useState<PaginationModel>({
    page: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    debouncedFetch(formState, paginationModel);
  }, [paginationModel, formState, debouncedFetch]);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    const identifier = params.row.identifier;
    router.push(`/protected/members/${identifier}`);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

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
