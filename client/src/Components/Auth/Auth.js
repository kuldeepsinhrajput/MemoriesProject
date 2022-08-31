
//clientid:"539851861417-qpa451qhld3s08om5n9kc3453ko97pj2.apps.googleusercontent.com"
/*import React, { useState, useRef } from "react";
import { useScript } from "./hooks/useScript";
import jwt_deocde from "jwt-decode";

const App = () => {
  const googlebuttonref = useRef();
  const [user, setuser] = useState(false);
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_deocde(userCred);
    console.log(payload);
    setuser(payload);
  };
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // here's your Google ID
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "medium",
    });
  });*/
//import React, { useState } from "react";


import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import jwt_deocde from "jwt-decode";
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { signin, signup } from '../../actions/auth';
import Input from './input';
import Icon from './icon';


import useStyles from './styles';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);



  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (user) => {
    let token = user.credential;
    let result = jwt_deocde(token);
    // console.log(payload);
    // console.log("token : ",userCred);
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (err) => {
    console.log(err);
    alert('Google Sign In was unsuccessful. Try again later');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            // clientId = "326579534717-2cjt4j4dfs7gu140tq357i0p0e8e6g1q.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Auth;