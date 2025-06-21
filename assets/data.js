
import React from "react";
import Link from "next/link";

export const addOns = [
  {
    id: 1,
    title: `Window Cleaning`,
    description: `Let the light shine through, with our streak free window cleaning add-on. Add window cleaning to your service and recieve an extra shine when you open your blinds.`,
    price: "35"
  },
  {
    id: 2,
    title: `Stove / Oven Cleaning`,
    description: `When your fresh baked cookies start to smell like cheese pizza, It's Time to Clean Your Oven! We'll get that tough to remove grease that has been burning off your drip pans too.`,
    price: "15"
  },
  {
    id: 3,
    title: `Ceiling Fans Cleaning`,
    description: `Breathe in the fresh spring air. Cleaning your ceiling fans can help get rid of sinus issues and help you feel more comfortable relaxing around the home.`,
    price: "15"
  },
  {
    id: 4,
    title: `Baseboard Cleaning`,
    description: `Cleaning those lonely and unnoticed baseboard will give your home that extra sparkle it needs to feel extra clean. Start by cleaning one room, or all the rooms for a real deep cleaning.`,
    price: "70"
  },
  // {
  //   id: 5,
  //   title: `Blinds Dusting`,
  //   description: ``,
  //   price: "15"
  // },
  // {
  //   id: 6,
  //   title: `Walls and Doors Cleaning`,
  //   description: ``,
  //   price: "35"
  // },
];

export const SurfaceCleaning = [
  {
    id: 1,
    title: `Bedrooms`,
    description: `Dust and wipe all surfaces and reachable fixtures including window seals, door knobs and handles. We remove all trash, change your sheets and make your bed, organize your dresser and closet, and sweep, vacuum or mop your floors.`,
  },
  {
    id: 2,
    title: `Kitchen`,
    description: `Cleaning your dishes, your sink , refrgerator doors and handles, stove and oven surfaces, counter tops, cabinets and handles, floors, light switches, and any reachable fixtures. We get rid of all the grease, dirt and remove the trash.`,
  },
  {
    id: 3,
    title: `Bathrooms`,
    description: `Clean all the surface of your bathroom with a disinfectant bathroom cleaners and bleach. Wipe and clean mirrors, sinks, tub, walls, toilets, cabinets, handles and door knobs, floors, remove the trash, replace bathroom towels, rugs and hand soaps.`,
  },
  {
    id: 4,
    title: `Living Room and Commmon Areas`,
    description: `Wipe and dust all surfaces and reachable fixtures, including window seals, knobs and handles. Organize couches, sofas, end tables and coffee tables, sweep and mop or vacuum, and remove all trash.`,
  }
]

function Privacy() {
  return <a href='/privacy-policy'>privacy</a>
}

export const steps = [
  {
    id: "1",
    step: `Register`,
    description: (
      <>
        Register to receive the price of your cleaning. We'll use your home size to calculate your price and your address to make sure we have cleaners in your area. Learn more about registering in our{" "} <Link href="/privacy-policy">privacy policy</Link>.
      </>
    ),
  },
  {
    id: "2",
    step: `Schedule an Appointment`,
    description: (
      <>
      Choose a date and time that works for you from our availability calendar. Select your deep cleaning add-ons to meet your cleaning needs. Make a $25 deposit to confirm your booking{" "} <Link href="/terms-of-service">terms of service</Link>.
      </>
    ),
  },
  {
    id: "3",
    step: `Recieve Confirmation`,
    description: `We’ll send you a confirmation email after booking. You'll be able to access your booking and make changes at anytime.`,
  },
  {
    id: "4",
    step: `Prepare for your Appointment`,
    description: `Ensure your space is accessible. We'll take care of the rest.`,
  },
]