"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";

const Footer = () => {

  const router = useRouter();
  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated, handleLogout } = auth;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <footer>
      <div className='bg-dark' style={{ color: 'white', padding: '20px', }}>

        <div className='row'>

          <div className='list-group list-group-flush col-3 col-md-3 col-sm-12'>

            <h4 style={{ textDecoration: 'underline' }}>Quick Links</h4>


            {isLoggedIn ?
              (
                <>
                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/booking'>Schedule an Appointment</Link>

                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/appointments'>Upcoming Appointments</Link>

                  <span 
                  onClick={handleLogout} 
                  className='list-group-item bg-dark text-white logoutText' >Logout</span>

                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/user-profile'>Profile</Link>
                </>
              ) : (
                <>
                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/signup'>Sign Up</Link>

                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/signin'>Sign In</Link>

                </>
              )
            }
          </div>

          <div className='list-group list-group-flush col-3 col-md-3 col-sm-12'>

            <h4 style={{ textDecoration: 'underline', }}>Cleaning Services</h4>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='#'>Move-Out Cleaning</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='#'>Office Cleaning</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='#'>Commercial Cleaning Services</Link>

          </div>

          <div className='list-group list-group-flush col-3 col-md-3 col-sm-12'>

            <h4 style={{ textDecoration: 'underline', }}>About JMAC</h4>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/privacy-policy'>Privacy Policy</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/terms-of-service'>Terms of Service</Link>

          </div>

          <div className='list-group list-group-flush col-3 col-md-3 col-sm-12'>

            <h4 style={{ textDecoration: 'underline', }}>Contact JMAC</h4>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='tel:+13057937344'>(305)793-7344</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='mailto:shepardcurtis2@gmail.com'>shepardcurtis2@gmail.com</Link>

            <p className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }}>Monday - Friday  8:00am -7:00pm</p>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
// <footer style={styles.container}>
//   {isLoggedIn ? (
//     <div style={styles.container}>
//       <Link href="/privacy-policy">Privacy Policy</Link>
//       <Link href="/user-profile">Profile</Link>
//       <span onClick={handleLogout} style={styles.logoutText}>Logout</span>
//     </div>
//   ) : (
//     <div style={styles.container}>
//       <Link href="/privacy-policy">Privacy Policy</Link>
//       <Link href="/signin">Sign In</Link>
//     </div>
//   )}
// </footer>

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px 0",
    alignItems: "center",
    backgroundColor: "orange",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
