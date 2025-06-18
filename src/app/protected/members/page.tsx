"use client"
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";

export default function Members() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 1,
    pageSize: 5,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`);
    url.pathname = `${url.pathname}views/members/`;
    url.searchParams.set("page", String(paginationModel.page));
    url.searchParams.set("pageSize", String(paginationModel.pageSize));

    console.log(sortModel)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setRows(data.rows);
        setRowCount(data.rowCount);
        setIsLoading(false);
      })
      .catch((err) => {
        setRows([]);
        setRowCount(0);
        setIsLoading(false);
        console.log(err)
      });
  }, [paginationModel, sortModel, filterModel]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Ime",
      flex:1,
      align:"center",
      headerAlign:"center",
    },
    {
      field: "surname",
      headerName: "Prezime",
      flex:1,
      align:"center",
      headerAlign:"center",
    },
    {
      field: "date_of_joining",
      headerName: "Datum upisa",
      flex:1,
      align:"center",
      headerAlign:"center",
    },
    {
      field: "identifier",
      headerName: "Identifikator",
      flex:1,
      align:"center",
    },
    {
      field: "email",
      headerName: "Imejl",
      flex:1,
      align:"center",
      headerAlign:"center",
    },
    {
      field: "is_public",
      headerName: "Na sajtu",
      flex:1,
      align:"center",
      headerAlign:"center",
    },
  ];

  return (
    <div style={{ minHeight: 300, width: '100%' }}>
<DataGrid
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      loading={isLoading}
      pageSizeOptions={[5, 10, 15]}
      paginationModel={paginationModel}
      sortModel={sortModel}
      filterModel={filterModel}
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={setSortModel}
      onFilterModelChange={setFilterModel}
      getRowId={(row)=>row.member_uid}
      sx={{justifyContent:"center"}}
      
    />
    </div>
    
  );
}
