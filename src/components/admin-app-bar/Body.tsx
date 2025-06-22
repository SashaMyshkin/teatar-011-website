import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "@components/admin-app-bar/Drawers";

export async function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="div"
          sx={{ flexGrow: 1, width: drawerWidth, display: { sx: "none" } }}
        >
          0
        </Box>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
