// This is the main home page component for the portfolio website
// It imports and renders the portfolio sections

import React from "react";

import Hero from "./components/Hero";
import Statement from "./components/Statement";
import Projects from "./components/Projects";
// import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Projects />
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
