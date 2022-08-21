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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
};
export default App;
