import { useRouter } from "next/navigation";
import useSelectPerformances from "@components/performances/hooks/useSelectPerformances";
import { useEffect } from "react";
import { SelectPerformancesForm } from "@components/performances/types";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, red } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TablePerformances(formState: SelectPerformancesForm) {
  const router = useRouter();
  const { rows, rowCount, isLoading, debouncedFetch } = useSelectPerformances();
  const [paginationModel, setPaginationModel] = React.useState({
      page: 0,
      pageSize: 5,
    });
  useEffect(() => {
    debouncedFetch(formState, paginationModel);
  }, [formState, debouncedFetch, paginationModel]);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
      const identifier = params.row.identifier;
      router.push(`/protected/performances/${identifier}`);
    };

    return (<React.Fragment>
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
        </React.Fragment>)
}


const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Naziv predstave",
    flex: 1,
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "type_name",
    headerName: "Tip predstave",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date_of_premiere",
    headerName: "Datum premijere",
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
