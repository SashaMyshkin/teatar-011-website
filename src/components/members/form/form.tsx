"use client";
import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { sr } from "date-fns/locale";
import { useMembershipStatuses } from "@/components/members/hooks/useMembershipStatuses";
import { ManageMemberProps } from "@/components/members/types";

export default function Form({
  manageMemberProps,
}: {
  manageMemberProps: ManageMemberProps;
}) {
  const { membershipStatuses } = useMembershipStatuses();
  const {
    formState: memberData,
    errorState: errorData,
    action,
    setField,
    validateField,
  } = manageMemberProps;

  const dateOfJoiningDB = manageMemberProps.formState.date_of_joining;
  const dateOfJoining =
    dateOfJoiningDB != null && dateOfJoiningDB !== ""
      ? new Date(dateOfJoiningDB)
      : new Date();

  let dateOfBirth = null;
  if (action === "update") {
    const dateOfBirthDB = manageMemberProps.formState.date_of_birth;
    dateOfBirth =
      dateOfBirthDB != null && dateOfBirthDB !== ""
        ? new Date(dateOfBirthDB)
        : null;
  }

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
          value={memberData.name}
          onChange={(e) => {
            setField("name", e.target.value);
            validateField("name", e.target.value);
          }}
          error={errorData.name.error}
          helperText={errorData.name.message}
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
          value={memberData.surname}
          onChange={(e) => {
            setField("surname", e.target.value);
            validateField("surname", e.target.value);
          }}
          error={errorData.surname.error}
          helperText={errorData.surname.message}
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
          slotProps={{
            input: {
              readOnly: manageMemberProps.action === "update",
            },
          }}
          value={memberData.identifier}
          onChange={(e) => {
            setField("identifier", e.target.value);
            validateField("identifier", e.target.value);
          }}
          error={errorData.identifier.error}
          helperText={errorData.identifier.message}
          color="secondary"
        />
        {action === "update" && (
          <TextField
            margin="dense"
            id="motto"
            name="motto"
            label="Moto"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            value={manageMemberProps.formState.motto || ""}
            onChange={(e) => {
              manageMemberProps.setField("motto", e.target.value);
              manageMemberProps.validateField("motto", e.target.value);
            }}
            error={manageMemberProps.errorState.motto.error}
            helperText={manageMemberProps.errorState.motto.message}
            color="secondary"
          />
        )}
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
          value={memberData.membership_status_uid}
          error={errorData.membership_status_uid.error}
          helperText={errorData.membership_status_uid.message}
          onChange={(e) => {
            setField("membership_status_uid", e.target.value);
          }}
          color="secondary"
        >
          {membershipStatuses ? (
            membershipStatuses.map((status) => {
              return (
                <MenuItem key={status.code} value={status.id}>
                  {status.description}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem disabled>Učitava se...</MenuItem>
          )}
        </TextField>
        {action === "update" && (
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Imejl"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            value={manageMemberProps.formState.email || ""}
            onChange={(e) => {
              manageMemberProps.setField("email", e.target.value);
              manageMemberProps.validateField("email", e.target.value);
            }}
            error={manageMemberProps.errorState.email.error}
            helperText={manageMemberProps.errorState.email.message}
            color="secondary"
          />
        )}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
          <DatePicker
            label="Datum upisa"
            name="date_of_joining"
            value={dateOfJoining}
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
        {action === "update" && (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
            <DatePicker
              label="Datum rođenja"
              name="date_of_birth"
              value={dateOfBirth}
              onChange={(date) => {
                manageMemberProps.setField("date_of_birth", date);
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
        )}
      </Box>
    </React.Fragment>
  );
}
