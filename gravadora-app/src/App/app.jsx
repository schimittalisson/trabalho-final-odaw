import React from "react";
import "./app.css";
import NavBar from "./NavBar/NavBar.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Services from "./Services/Services.jsx";
import Footer from "./Footer/Footer.jsx";

class RecordingStudioApp extends React.Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <LandingPage />
        <Services />
        <Footer />
      </div>
    );
  }
}

export default RecordingStudioApp;
