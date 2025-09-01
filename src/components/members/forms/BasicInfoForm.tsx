"use client";
import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { sr } from "date-fns/locale";
import { BasicInfoFormProps } from "../types";
import { format } from "date-fns";
import { useMemberContext } from "../context/MemberContext";

export default function BasicInfoForm({
  formState,
  errorState,

  setField,
  validateField,
}: BasicInfoFormProps) {
  const { membershipStatuses } = useMemberContext();

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Ime"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          value={formState.name}
          onChange={(e) => {
            setField("name", e.target.value);
            validateField("name", e.target.value);
          }}
          error={errorState.name.error}
          helperText={errorState.name.message}
          color="secondary"
        />
        <TextField
          required
          margin="dense"
          id="surname"
          name="surname"
          label="Prezime"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          value={formState.surname}
          onChange={(e) => {
            setField("surname", e.target.value);
            validateField("surname", e.target.value);
          }}
          error={errorState.surname.error}
          helperText={errorState.surname.message}
          color="secondary"
        />
        <TextField
          required
          margin="dense"
          id="identifier"
          name="identifier"
          label="Identifikator"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          value={formState.identifier}
          onChange={(e) => {
            setField("identifier", e.target.value);
            validateField("identifier", e.target.value);
          }}
          error={errorState.identifier.error}
          helperText={errorState.identifier.message}
          color="secondary"
        />

        <TextField
          margin="dense"
          id="motto"
          name="motto"
          label="Moto"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          value={formState.motto}
          onChange={(e) => {
            setField("motto", e.target.value);
            validateField("motto", e.target.value);
          }}
          error={errorState.motto.error}
          helperText={errorState.motto.message}
          color="secondary"
        />

        <TextField
          select
          required
          label="Status članstva"
          fullWidth
          variant="standard"
          size="small"
          margin="dense"
          id="membership-status-uid"
          name="membership_status_uid"
          value={formState.membership_status_uid}
          onChange={(e) => {
            setField("membership_status_uid", e.target.value);
          }}
          color="secondary"
        >
          {membershipStatuses.map((status) => {
            return (
              <MenuItem key={status.membership_status_uid} value={status.id}>
                {status.status_name}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Imejl"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          value={formState.email}
          onChange={(e) => {
            setField("email", e.target.value);
            validateField("email", e.target.value);
          }}
          error={errorState.email.error}
          helperText={errorState.email.message}
          color="secondary"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
          <DatePicker
            label="Datum upisa"
            name="date_of_joining"
            value={new Date(formState.date_of_joining)}
            onChange={(date) => {
              setField("date_of_joining", date);
            }}
            format="dd. MM. yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                size: "small",
                margin: "dense",
                required: true,
                color: "secondary",
              },
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
          <DatePicker
            label="Datum rođenja"
            name="date_of_birth"
            value={
              new Date(
                formState.date_of_birth ?? format(new Date(), "yyyy-MM-dd")
              )
            }
            onChange={(date) => {
              setField("date_of_birth", date);
            }}
            format="dd. MM. yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                size: "small",
                margin: "dense",
                required: false,
                color: "secondary",
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </React.Fragment>
  );
}
