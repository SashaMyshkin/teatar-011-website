import { LoginForm } from "@components/login-form";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginForm />
    </Box>
  );
}
