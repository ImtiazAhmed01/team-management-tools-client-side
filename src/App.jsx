import React, { useState } from "react";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import ChatBox from "./Component/chat/ChatBox";
import { Outlet } from "react-router-dom";
import Eid from "./Component/Eid-Greetings/Eid";
import {ThemeToggleButton} from "./Component/ThemeProvider/ThemeToggleButton";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Eid setShowIntro={setShowIntro} />
      ) : (
        <>
          <Navbar />
          <div className="relative pt-16">
            <Outlet />
            <ChatBox />
            <ThemeToggleButton />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
