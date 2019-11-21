import React, { useState } from 'react';
import './App.css';
import Navbar from "./Component/Navbar"
import MainPage from "./Component/MainPage"
import Footer from "./Component/Footer"
import PopupMess from "./Component/PopupMess"
import VideoModal from "./Component/Video"
import LoginPage from "./Component/Login_Signup"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const [showPopupVideo, setShowPopup] = useState(false);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage activeForm={1}/>
          </Route>
          <Route path="/signup">
            <LoginPage activeForm={2}/>
          </Route>
          <Route path="/">
            <MainPage handleClickOpenPopup={() => setShowPopup(true)} />
          </Route>
        </Switch>
        <Footer />
        <PopupMess />
        <VideoModal
          showPopupVideo={showPopupVideo}
          handleClickClosePopup={() => setShowPopup(false)}
        />
      </Router>
    </div>
  );
}

export default App;
