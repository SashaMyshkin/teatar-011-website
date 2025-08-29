import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { SelectPerformancesProps } from "@components/performances/types";
import { useSelectTypes } from "@components/performances/hooks/useSelectTypes";


export default function SearchBarPerformances({formState, setField}:SelectPerformancesProps){
  const {loading, types} = useSelectTypes();

  return(<React.Fragment>
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
            id="title"
            label="Naziv predstave"
            variant="standard"
            size="small"
            value={formState.title}
            onChange={(e) => {
              setField("title", e.target.value)
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="is-public-label"></InputLabel>
            <Select
              labelId="is-public-label"
              id="is-public"
              label="Objavljena"
              size="small"
              variant="standard"
              displayEmpty
              value={formState.is_public}
              onChange={(e) => {
                setField("is_public", e.target.value);
              }}
            >
              <MenuItem value="2">Sve</MenuItem>
              <MenuItem value="1">Objavljene</MenuItem>
              <MenuItem value="0">Neobjavljene</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="performance-type-label"></InputLabel>
            <Select
              labelId="performance-type-label"
              id="performance-type"
              label="Tip predstave"
              size="small"
              variant="standard"
              displayEmpty
              value={formState.performance_type_uid}
              onChange={(e) => {
                setField("performance_type_uid", e.target.value);
              }}

              
            >
              {
                loading && (<MenuItem value="1">Učitava se...</MenuItem>)
              }
              {
                types && types.map((elem)=>{
                  return(<MenuItem key={elem.type_name} value={elem.performance_type_uid}>{elem.type_name}</MenuItem>)
                })
              }
              
            </Select>
          </FormControl>
          
          
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          N
        </Box>
      </Box>
    </React.Fragment>)
}