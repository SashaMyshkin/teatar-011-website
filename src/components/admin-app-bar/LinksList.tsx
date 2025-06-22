"use client";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from '@mui/icons-material/People';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { usePathname } from "next/navigation";

const links = [
  { name: "Početna", pathname: "/protected", icon: MailIcon },
  { name: "Članovi", pathname: "/protected/members", icon: PeopleIcon },
  { name: "Predstave", pathname: "/protected/performances", icon: TheaterComedyIcon },
  {
    name: "Festivali i nagrade",
    pathname: "/festivals-and-awards",
    icon: EmojiEventsIcon,
  },
];

export default function LinksList() {
  const pathname = usePathname();
  return (
    <List>
      {links.map((link) => (
        <ListItem key={link.pathname} disablePadding>
          <Link href={link.pathname} passHref legacyBehavior>
            <ListItemButton component="a" selected={pathname === link.pathname}>
              <ListItemIcon>
                <link.icon />
              </ListItemIcon>
              <ListItemText
                primary={link.name}
                sx={(theme) => ({

                  fontStyle: pathname === link.pathname ? "italic" : "inherit",
                  color:
                    pathname === link.pathname
                      ? theme.palette.primary.main
                      : "inherit",
                      fontFamily:"monospace",
                      letterSpacing:0.5
                })}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
