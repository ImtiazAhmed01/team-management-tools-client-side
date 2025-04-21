import React, { useState } from "react";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import { Outlet } from "react-router-dom";
import Eid from "./Component/Eid-Greetings/Eid";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Eid setShowIntro={setShowIntro} />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
      {/* <Navbar></Navbar>
      <Outlet />
      <Footer /> */}
    </>
  );
}

export default App;
