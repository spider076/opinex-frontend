import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Home, History, Person, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "History", icon: <History />, path: "/history" },
    { text: "Profile", icon: <Person />, path: "/profile" },
  ];

  const drawer = (
    <div className="w-64 bg-white dark:bg-gray-800 h-full">
      <List>
        {menuItems.map((item) => (
          <ListItem
            button={true}
            key={item.text}
            component={Link}
            to={item.path}
            className="hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <ListItemIcon className="text-blue-600 dark:text-blue-400">
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className="md:hidden"
      >
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className="md:hidden"
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        className="hidden md:block"
        sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
