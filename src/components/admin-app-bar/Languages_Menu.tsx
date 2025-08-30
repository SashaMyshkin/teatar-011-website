"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import { Button, Menu } from "@mui/material";

import { useLanguageContext } from "@components/context/LanguageContext";
import { Language } from "../languages/types";

export default function LanguagesMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  
  const {language, languages, setLanguage} = useLanguageContext();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelectScript = (lang:Language) => {
    setLanguage(lang);
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpenMenu} variant="outlined">
        {language.description}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom", // stick to the bottom of the button
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top", // open menu downward
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseMenu}
        sx={{ zIndex: 4000 }}
      >
        <Paper sx={{ width: 320 }}>
          <MenuList dense>
            {languages.map((script) => {
              return (
                <MenuItem
                  key={script.name}
                  onClick={() => {
                    handleSelectScript(script);
                  }}
                >
                  {script.id === language.id && (
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                  )}
                  <ListItemText inset={script.id !== language.id}>
                    {script.description}
                  </ListItemText>
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      </Menu>
    </React.Fragment>
  );
}
