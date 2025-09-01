import Drawer from "@mui/material/Drawer";
import LinksList from "@components/admin-app-bar/LinksList";
import { Toolbar } from "@mui/material";

export const drawerWidth = 240;

export function DesktopDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .mui-oc2eyy-MuiPaper-root-MuiDrawer-paper": {zIndex:100},
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        
      }}
      open
    >
      <Toolbar />
      <LinksList/>
    </Drawer>
  );
}

interface MobileDrawerProps{
  mobileOpen:boolean
  handleDrawerTransitionEnd: ()=>void
  handleDrawerClose: ()=>void
}

export function MobileDrawer({mobileDrawerProps}:{mobileDrawerProps:MobileDrawerProps}) {
  return (
    <Drawer
      variant="temporary"
      open={mobileDrawerProps.mobileOpen}
      onTransitionEnd={mobileDrawerProps.handleDrawerTransitionEnd}
      onClose={mobileDrawerProps.handleDrawerClose}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      slotProps={{
        root: {
          keepMounted: true, // Better open performance on mobile.
        },
      }}
    >
      <Toolbar />
      <LinksList/>
    </Drawer>
  );
}
