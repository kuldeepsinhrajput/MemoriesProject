/*
import React from "react";
import { Container } from "@material-ui/core";
//in react we needn't to mention .js file name.

import Navbar from "./Components/Navbar/Navbar";
import useStyles from "./styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
const App = () => {
  <BrowserRouter>
    <Container maxidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
      <Home />
    </Container>
  </BrowserRouter>;
};

export default App;
*/
import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Auth from "./Components/Auth/Auth";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./Components/PostDetails/PostDetails";
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="539851861417-qpa451qhld3s08om5n9kc3453ko97pj2.apps.googleusercontent.com">
      <Router>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            {/* <Route path="/" element={() => <Navigate replace to ="/posts" />} /> */}
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={(!user ? <Auth /> : <Navigate replace to="/posts" />)} />

          </Routes>
        </Container>
      </Router>
    </GoogleOAuthProvider>
  );
};
export default App;
