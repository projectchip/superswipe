import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import BodyComponent from "../components/BodyComponent";
import Footer from "../components/Footer";

const details = () => {
    return (
        <>
      <main className="flex flex-col p-24"
        style={{padding: 0}}
      >
        <NavbarComponent />
        <BodyComponent />
        <Footer />
      </main>
    </>
    );
};


export default details;