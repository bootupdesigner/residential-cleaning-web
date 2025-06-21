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

          <div className='list-group list-group-flush col-12 col-md-12 col-sm-12 col-lg-3'>

            <h4 style={{ textDecoration: 'underline' }}>Quick Links</h4>


            {isLoggedIn ?
              (
                <>
                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/user-profile'>My Account</Link>

                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/booking'>Schedule an Appointment</Link>

                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/appointments'>Upcoming Appointments</Link>

                  <span
                    onClick={handleLogout}
                    className='list-group-item bg-dark text-white logoutText' >Logout</span>


                </>
              ) : (
                <>
                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/signup'>Sign Up</Link>

                  <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/signin'>Sign In</Link>

                </>
              )
            }
          </div>

          <div className='list-group list-group-flush col-12 col-md-12 col-sm-12 col-lg-3'>

            <h4 style={{ textDecoration: 'underline', }}>Cleaning Services</h4>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='#'>Move-Out Cleaning</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='#'>Office Cleaning</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='#'>Commercial Cleaning Services</Link>

          </div>

          <div className='list-group list-group-flush col-12 col-md-12 col-sm-12 col-lg-3'>

            <h4 style={{ textDecoration: 'underline', }}>About JMAC</h4>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/privacy-policy'>Privacy Policy</Link>

            <Link className='list-group-item bg-dark text-white' style={{ textDecoration: 'none', }} href='/terms-of-service'>Terms of Service</Link>

          </div>

          <div className='list-group list-group-flush col-12 col-md-12 col-sm-12 col-lg-3'>

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