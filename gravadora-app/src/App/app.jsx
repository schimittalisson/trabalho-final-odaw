import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import NavBar from "./NavBar/NavBar.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Services from "./Services/Services.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import Artists from "./HomePage/Artists.jsx"
import Albums from "./HomePage/Albums.jsx"
import Instruments from "./HomePage/Instruments.jsx"
import Music from "./HomePage/Music.jsx"
import NavBarApp from "./NavBarApp/NavBarApp.jsx";


class RecordingStudioApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <NavBar />
              <LandingPage />
              <Services />
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />  
            </Route>
            <Route path="/home">
              <NavBarApp />
              <HomePage />
              <Footer />
            </Route>
            <Route path="/artists">
              <NavBarApp/>
              <Artists />
            </Route>
            <Route path="/music">
              <NavBarApp/>
              <Music />
            </Route>
            <Route path="/instruments">
              <NavBarApp/>
              <Instruments />
            </Route>
            <Route path="/albums">
              <NavBarApp/>
              <Albums />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
} 

export default RecordingStudioApp;
