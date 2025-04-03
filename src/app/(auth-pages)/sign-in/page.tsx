"use client";

import * as React from "react";
import { Typography, TextField, Button, Box, SxProps } from "@mui/material";
import { signInAction } from "@/actions";

export default function LoginPage(): React.JSX.Element {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    signInAction(formData)

  }

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "calc(100vh - 70px)",
        width: "100%",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Box component="form" sx={formStyles} onSubmit={handleSubmit}>
        <Typography component="h1" variant="h6" textAlign="center" sx={{color:"text.primary"}}>
          Administracija
        </Typography>
        <TextField
          id="email"
          name="email"
          type="text"
          label="Korisničko ime"
          variant="standard"
          size="small"
          autoComplete="false"
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Lozinka"
          variant="standard"
          size="small"
          autoComplete="false"
        />
        <Button variant="contained" type="submit">
          Uloguj se
        </Button>
      </Box>
    </Box>
  );
}

const formStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: 1,
  borderRadius: "3%",
  padding: "1.5rem",
  width: "22rem",
  boxShadow: 3,
  bgcolor: "background.paper",
};
