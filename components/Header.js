"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/icon.png";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const Header = ({ back = false, home = false, booking = true, title }) => {
  const router = useRouter();

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
