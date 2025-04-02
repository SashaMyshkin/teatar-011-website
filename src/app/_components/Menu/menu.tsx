"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

const pages = [
  "Repertoar",
  "Vesti",
  "Predstave",
  "Ansambl",
  "O nama",
  "Kontakt",
];
/*const settings = ["Profile", "Account", "Dashboard", "Logout"];*/

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const adminPanelMenu = [
    {
      text: "Audicije",
      href: "/auditions",
      divider: false,
    },
    {
      text: "Kandidati",
      href: "/candidates",
      divider: false,
    },
    {
      text: "Komunikacija sa kandidatima",
      href: "/communication",
      divider: false,
    },
    {
      text: "",
      href: "",
      divider: true,
    },
    {
      text: "Predstave",
      href: "/performances",
      divider: false,
    },
    {
      text: "Članovi",
      href: "/members",
      divider: false,
    },
    {
      text: "Vesti",
      href: "/news",
      divider: false,
    },
  ];


function ResponsiveAppBar() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  

  const [DrawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Teatar 011
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Teatar 011
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    mr: 2,
                  },
                  DrawerOpen && { display: "none" },
                ]}
              >
                <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
        variant="persistent"
        anchor="right"
        open={DrawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {adminPanelMenu.map(({ text, divider }, index) => {
            if (divider) {
              return <Divider key={index}></Divider>;
            } else {
              return (
                <ListItemButton
                  component="button"
                  key={index}
                  style={{ width: "100%" }}
                >
                  <Link
										
                    href='#'
                    style={{ display: "inline-block", width: "100%" }}
                  >
                    <ListItemText primary={text} />
                  </Link>
                </ListItemButton>
              );
            }
          })}
          <Divider></Divider>
          <ListItemButton
            component="button"
            sx={{ width: "100%", textAlign: "center" }}
          >
            <ListItemText primary="Odjavi se" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
export default ResponsiveAppBar;
