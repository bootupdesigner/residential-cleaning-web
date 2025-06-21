"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";
import Image from "next/image";
import logo from "../public/icon.png";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';


const Header = ({ back = false, home = false, booking = true, title }) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useAuth();
  const isLoggedIn = !!auth?.isAuthenticated;
  const handleLogout = auth?.handleLogout;

  const menuItems = [
    { label: "Home", path: "/" },
    ...(isLoggedIn ? [
      { label: "Appointments", path: "/appointments" },
      { label: "Schedule a Cleaning", path: "/booking" },
      { label: "My Account", path: "/user-profile" },
      { label: "Previous Appointments", path: "/previous-bookings" },
      {
        label: "Logout",
        action: async () => {
          await handleLogout();
          router.push("/signin");
        },
      },
    ] : [
      { label: "Sign In", path: "/signin" },
    ]),
  ];
  


  const handleNavigation = (path) => {
    router.push(path);
    setIsDrawerOpen(false);
  };

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: "space-between", padding: "10px 10px", backgroundColor: 'black', color: 'white', }}>

        <a
          className="headerLink"
          href="mailto:shepardcurtis2@gmail.com"
        >
          <EmailIcon sx={{ color: "white", fontSize: "24px" }} />
          <p style={{ fontSize: "20px", color: "white", margin: 0 }}>Email Us</p>
        </a>



        <a
          className="headerLink"
          href="tel:+13057937344">
          <CallIcon sx={{ color: "white", fontSize: "24px" }} />
          <p style={{ fontSize: "20px", color: "white", margin: 0 }}>Call a Cleaner</p>
        </a>

        <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ color: "white" }}>
          <MenuIcon fontSize="large" />
        </IconButton>

      </div >

      <div style={styles.headerContainer}>
        {back && (
          <button onClick={() => router.back()} style={styles.iconWrapper}>
            <p>BACK</p>
          </button>
        )}

        <button style={{
          border: "none",
          cursor: "pointer",
        }}
          onClick={() => router.replace("/")} >
          <Image
            src={logo}
            alt="JMAC Cleaning Services Logo"
            width={120}
            height={120}
            style={styles.logo}
          />
        </button>

        {home && (
          <button onClick={() => router.push("/")} style={styles.iconWrapper}>
            <p>HOME</p>
          </button>
        )}

      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <h1 style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", }}>{title}</h1>

        {booking && (<a onClick={() => router.push("/booking")} className="btn btn-outline-success" >Schedule a Cleaning</a>)}
      </div>

      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div style={{ width: 250, padding: "20px" }}>
          <h3>Menu</h3>
          <Divider sx={{ marginBottom: "10px" }} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={async () => {
                  if (item.action) {
                    await item.action();
                  } else if (item.path) {
                    handleNavigation(item.path);
                  }
                  setIsDrawerOpen(false); // Always close drawer
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

        </div>
      </Drawer>

    </header>
  );
};

export default Header;

const styles = {
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    padding: "10px 20px",
  },
  logo: {
    objectFit: "contain",
  },
  iconWrapper: {
    padding: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  iconPlaceholder: {
    width: "30px",
  },
};