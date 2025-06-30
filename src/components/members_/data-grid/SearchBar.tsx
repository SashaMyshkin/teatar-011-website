"use client"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import NewMember from "@/components/members_/NewMember";
import { SelectMembersProps } from "@/components/members_/types";

export default function SearchBar({selectMembersProps}:{selectMembersProps:SelectMembersProps}) {
  const {formState, setField} = selectMembersProps
  return (
    <React.Fragment>
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
            value={formState.name}
            onChange={(e) => {
              setField("name", e.target.value)
            }}
          />
          <TextField
            id="surname"
            label="Prezime"
            variant="standard"
            size="small"
            value={formState.surname}
            onChange={(e) => {
              setField("surname", e.target.value)
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
              value={formState.is_public}
              onChange={(e) => {
                setField("is_public", e.target.value);
              }}
            >
              <MenuItem value="2">Svi</MenuItem>
              <MenuItem value="1">Objavljen</MenuItem>
              <MenuItem value="0">Neobjavljen</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <NewMember></NewMember>
        </Box>
      </Box>
    </React.Fragment>
  );
}
