import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Collapse,
  Fab,
  MenuItem,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { sr } from "date-fns/locale";
import { MembershipStatuses } from "@/lib/types";
import { identifierCheck } from "@/lib/zod/input/member_uid";
import { nameValidation, surnameValidation } from "@/lib/zod/input/member";
import { useRouter } from "next/navigation";
import {
  ValidationErrorCodes,
  ValidationErrorRegistry,
} from "@/lib/errors/validationErrors";

interface AlertProps {
  message: string;
  openModal: boolean;
  severity: AlertColor;
}

export default function NewMember() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [dateOfJoining, setDateOfJoining] = React.useState<Date | null>(null);
  const [identifier, setIdentifier] = React.useState("");
  const [membershipStatuses, setMembershipStatuses] = React.useState<
    MembershipStatuses[] | null
  >(null);
  const [membershipStatus, setMembershipStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [identifierValidation, setIdentifierValidation] = React.useState({
    error: false,
    message: "",
  });
  const [nameCheck, setNameCheck] = React.useState({
    error: false,
    message: "",
  });
  const [surnameCheck, setSurnameCheck] = React.useState({
    error: false,
    message: "",
  });

  const [loadingButton, setLoadingButton] = React.useState(false);

  const [transitionAlertProps, setTransitionAlertProps] =
    React.useState<AlertProps>({
      message: "",
      openModal: false,
      severity: "success",
    });

  React.useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`);
    url.pathname += "/members_membership_status_uid";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMembershipStatuses(data.membershipStatuses);
      })
      .catch((err) => {
        handleClose();
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName("");
    setSurname("");
    setIdentifier("");
    setDateOfJoining(null);
    setMembershipStatus("");

    setNameCheck({
      error: false,
      message: "",
    });

    setSurnameCheck({
      error: false,
      message: "",
    });

    setIdentifierValidation({
      error: false,
      message: "",
    });

    setTransitionAlertProps((e) => {
      return { ...e, openModal: false };
    });

    setLoadingButton(false);
    setOpen(false);
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = identifierCheck.safeParse({ identifier: value });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input.";

      setIdentifierValidation({
        error: true,
        message: firstError,
      });

      setIdentifier(value);
      return;
    }

    setIdentifierValidation({
      error: false,
      message: "",
    });

    setIdentifier(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = nameValidation.safeParse({ name: value });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input.";

      setNameCheck({
        error: true,
        message: firstError,
      });

      setName(value);
      return;
    }

    setNameCheck({
      error: false,
      message: "",
    });

    setName(value);
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = surnameValidation.safeParse({ surname: value });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input.";

      setSurnameCheck({
        error: true,
        message: firstError,
      });

      setSurname(value);
      return;
    }

    setSurnameCheck({
      error: false,
      message: "",
    });

    setSurname(value);
  };

  const isValidDate = (d: Date | null) =>
    d instanceof Date && !isNaN(d.getTime());

  const isFormValid =
    !nameCheck.error &&
    !surnameCheck.error &&
    !identifierValidation.error &&
    membershipStatus !== "" &&
    isValidDate(dateOfJoining);

  return (
    <React.Fragment>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              //Loading state
              setLoadingButton(true);

              //Preparing the endpoint
              const urlCreateMemer = new URL(
                `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`
              );
              urlCreateMemer.pathname += "/create-member";

              //Preparing the data
              const memberData = {
                identifier,
                date_of_joining: dateOfJoining,
                membership_status_uid: membershipStatus,
                name,
                surname,
              };

              try {
                //Creating the user
                const serverResult = await fetch(urlCreateMemer, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(memberData),
                });

                //The only error we are expecting from the API
                //is if there already is a user with the same identifier.
                if (!serverResult.ok) {
                  const serverResponse = await serverResult.json();

                  if (
                    ValidationErrorCodes.IdentificatorExists ===
                    serverResponse.code
                  ) {
                    setTransitionAlertProps({
                      openModal: true,
                      severity: "error",
                      message:
                        ValidationErrorRegistry[
                          ValidationErrorCodes.IdentificatorExists
                        ].message,
                    });
                  } else {
                    setTransitionAlertProps({
                      openModal: true,
                      severity: "error",
                      message: "Desila se neočekivana greška.",
                    });
                  }
                  setLoadingButton(false);
                }

                
                setLoadingButton(false);
                router.push(`/protected/members/${identifier}`);
              } catch (err) {
                setLoadingButton(false);
                setTransitionAlertProps({
                  openModal: true,
                  severity: "error",
                  message: "Konekcija sa serverom nije uspostavljena.",
                });
              }
            },
          },
        }}
      >
        <DialogTitle>Osnovni podaci</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box sx={{ width: "100%" }}>
            <Collapse in={transitionAlertProps.openModal}>
              <Alert
                severity={transitionAlertProps.severity}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setTransitionAlertProps((elem) => {
                        return { ...elem, openModal: false };
                      });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {transitionAlertProps.message}
              </Alert>
            </Collapse>
          </Box>
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
            value={name}
            onChange={handleNameChange}
            error={nameCheck.error}
            helperText={nameCheck.message}
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
            value={surname}
            onChange={handleSurnameChange}
            error={surnameCheck.error}
            helperText={surnameCheck.message}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="identifier"
            name="identifier"
            label="Identifikator"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            value={identifier}
            onChange={handleIdentifierChange}
            error={identifierValidation.error}
            helperText={identifierValidation.message}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
            <DatePicker
              label="Datum upisa"
              name="date_of_joining"
              value={dateOfJoining}
              onChange={(newValue) => setDateOfJoining(newValue)}
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
            value={membershipStatus}
            onChange={(e) => {
              setMembershipStatus(e.target.value);
            }}
          >
            {membershipStatuses?.map((status) => {
              return (
                <MenuItem key={status.code} value={status.id}>
                  {status.description}
                </MenuItem>
              );
            })}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            loading={loadingButton}
          >
            Unesi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
