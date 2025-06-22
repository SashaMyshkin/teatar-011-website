import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { sr } from "date-fns/locale";
import { useMembershipStatuses } from "@components/new-member/form/useMembershipStatuses";
import { CreateMemberProps } from "@components/new-member/types";

export default function Form({
  createMemberProps,
}: {
  createMemberProps: CreateMemberProps;
}) {
  const { membershipStatuses } = useMembershipStatuses();
  const memberData = createMemberProps.formState;
  const errorData = createMemberProps.errorState;
  const setField = createMemberProps.setField;
  const validateField = createMemberProps.validateField;

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
            validateField("name", e.target.value)
          }}
          error={errorData.name.error}
          helperText={errorData.name.message}
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
          value={memberData.identifier}
          onChange={(e) => {
            setField("identifier", e.target.value);
            validateField("identifier", e.target.value);
          }}
          error={errorData.identifier.error}
          helperText={errorData.identifier.message}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
          <DatePicker
            label="Datum upisa"
            name="date_of_joining"
            value={memberData.dateOfJoining}
            onChange={(date) => {
              setField("dateOfJoining", date);
            }}
            format="dd. MM. yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                size: "small",
                margin: "dense",
                required: true,
              },
            }}
          />
        </LocalizationProvider>
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
          value={memberData.membershipStatus}
          error={errorData.membershipStatus.error}
          helperText={errorData.membershipStatus.message}
          onChange={(e) => {
            setField("membershipStatus", e.target.value);
          }}
          onBlur={(e) => {
            validateField("membershipStatus", e.target.value);
          }}
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
      </Box>
    </React.Fragment>
  );
}
