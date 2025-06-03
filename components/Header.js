"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/icon.png";
import { Button } from "react-bootstrap";

const Header = ({ back = false, home = false, booking = true, title }) => {
  const router = useRouter();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: "space-between", padding: "10px 10px", backgroundColor: 'black', color: 'white', }}>
        <Button
          style={{ color: 'white' }}
          href="mailto:shepardcurtis2@gmail.com"
          variant='link'>Email Us</Button>

        <Button
          style={{ color: 'white' }}
          href="tel:+13057937344"
          variant='link'>Call a Cleaner</Button>
      </div>

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
            alt="Logo"
            width={90}
            height={90}
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

    </>
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
