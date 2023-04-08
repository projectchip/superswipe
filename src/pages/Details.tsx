import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import BodyComponent from "../components/BodyComponent";

const details = () => {
    return (
        <>
      <main className="flex flex-col p-24"
        style={{padding: 0}}
      >
        <NavbarComponent />
        <BodyComponent />
        <div style={{
          backgroundColor: '#f7f8fd',
          width: '100%',
          height: '50px',
          color: 'gray',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex'
        }}>© Copyright  2023</div>
      </main>
    </>
    );
};


export default details;