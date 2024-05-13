import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineManageAccounts, MdKeyboardArrowLeft } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const drawerWidth = 220;
  const accountLink = user.email ? "/account" : "/login";
  const navItems = ["Home", "Your Account"];
  const navIcons = [
    <AiOutlineHome className="w-6 h-6 text-black" />,
    <MdOutlineManageAccounts className="w-6 h-6 text-black" />,
  ];
  const navLinks = ["/", accountLink];

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    if (user.email) {
      dispatch(logout());
      //return <Navigate replace to = '/login' />
    }
  };

  const getCartSize = () => {
    let cartSize = 0;
    for (let i = 0; i < cart.length; i++) {
      cartSize += cart[i].quantity;
    }
    return cartSize;
  };

  return (
    <Box className="flex">
      <AppBar position="fixed" open={open}>
        <Toolbar className="!px-5 !h-16">
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={`!p-0 ${
              open ? "!hidden" : ""
            } !justify-start !text-white`}
          >
            <FiMenu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="border-b border-zinc-200 !min-h-[4rem]">
          <IconButton onClick={handleDrawerClose}>
            <MdKeyboardArrowLeft className="text-black" />
          </IconButton>
        </DrawerHeader>
        <List className="!p-0 h-full border-r border-zinc-200">
          {navItems.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                href={`${navLinks[index]}`}
              >
                <ListItemIcon
                  className={`!min-w-0 ${open ? "mr-3" : "mx-auto"}`}
                >
                  {navIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              href="/cart"
            >
              <ListItemIcon className={`!min-w-0 ${open ? "mr-3" : "mx-auto"}`}>
                <Badge badgeContent={getCartSize()} color="error">
                  <AiOutlineShoppingCart className="w-6 h-6 text-black" />
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary="Your Cart"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {cart.length > 0 ? (
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                href={user.email ? "/checkout" : "/login"}
              >
                <ListItemIcon
                  className={`!min-w-0 ${open ? "mr-3" : "mx-auto"}`}
                >
                  <MdOutlineShoppingCartCheckout className="w-6 h-6 text-black" />
                </ListItemIcon>
                <ListItemText
                  primary="Checkout"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ) : null}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              href="/login"
              onClick={signOut}
            >
              <ListItemIcon className={`!min-w-0 ${open ? "mr-3" : "mx-auto"}`}>
                {user.email ? (
                  <RiLogoutBoxLine className="w-6 h-6 text-black" />
                ) : (
                  <RiLoginBoxLine className="w-6 h-6 text-black" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={user.email ? "Sign Out" : "Sign In"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
