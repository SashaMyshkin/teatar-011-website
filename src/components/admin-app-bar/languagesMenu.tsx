"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import { Button, Menu } from "@mui/material";
import { useScripts } from "@components/admin-app-bar/useScripts";
import {
  LanguageContextProps,
  useLanguageContext,
} from "@components/context/LanguageContext";

export default function LanguagesMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { scripts, loading, error } = useScripts();
  const languageContext = useLanguageContext();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelectScript = (scriptId: number, scriptDescription: string) => {
    languageContext.setLanguage({ scriptId, scriptDescription });
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpenMenu} variant="outlined">
        {languageContext.scriptDescription}
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
            {scripts?.map((script) => {
              return (
                <MenuItem
                  onClick={() => {
                    handleSelectScript(script.id, script.description);
                  }}
                >
                  {script.id === languageContext.scriptId && (
                    <ListItemIcon key={script.name}>
                      <Check />
                    </ListItemIcon>
                  )}
                  <ListItemText inset={script.id !== languageContext.scriptId}>
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
