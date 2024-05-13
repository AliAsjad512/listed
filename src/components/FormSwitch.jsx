import "../forms.css";
import Text from "./Text";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Background from "./Background";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TitanLogo from "../assets/TitanLogo.png";
import TitanLogo2 from "../assets/Logo2.png";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Alert from "@mui/material/Alert";
import { registerUser, loginUser } from "./utils/data";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "react-router-dom";

function FormSwitch() {
  let navigate = useNavigate();
  const location = useLocation();
  const [activeForm, setActiveForm] = useState("login");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittingLog, setSubmittingLog] = useState(false);
  const [submitLogSuccess, setLogSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitErrorLog, setSubmitErrorLog] = useState("");
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username,
    email,
    password,
  });

  const handleSwitcherClick = (form) => {
    setActiveForm(form);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    if (activeForm === "signup" && password !== confirmPassword) {
      setSubmitting(false);
      setSubmitSuccess(false);
      setSubmitError(
        <Alert variant="filled" severity="error">
          Passwords do not match!
        </Alert>
      );
      return;
    }

    const registerResponse = await registerUser(email, password, username);

    if (registerResponse.success) {
      setSubmitSuccess(true);

      setTimeout(() => {
        handleSwitcherClick("login");
      }, 3000);
    } else if (!registerResponse.success) {
      setSubmitError(
        <Alert variant="filled" severity="error">
          {registerResponse.message}
        </Alert>
      );
    }

    setSubmitting(false);
  };

  const handleInputChange = () => {
    setFormData({
      username,
      email,
      password,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setSubmittingLog(true);
    setLogSubmitSuccess(false);
    setSubmitErrorLog("");

    const loginResponse = await loginUser(username, email, password);

    if (loginResponse.success) {
      setLogSubmitSuccess(true);
      <Alert variant="filled" severity="success">
        Welcome! You have successfully logged in! Proceed to our store!
      </Alert>;
      dispatch(login(loginResponse.data.user.email));
      setTimeout(() => {
        if (
          location.state &&
          location.state.from === "/cart" &&
          location.pathname === "/login"
        ) {
          navigate("/checkout");
        } else {
          navigate("/");
        }
      }, 1000);
    } else if (!loginResponse.success) {
      setSubmitErrorLog(
        <Alert variant="filled" severity="error">
          {loginResponse.error}
        </Alert>
      );
    }

    setSubmittingLog(false);
  };

  return (
    <section className="forms-section">
      <Background />
      <Text />
      <div className="forms">
        <div
          className={`form-wrapper ${
            activeForm === "login" ? "is-active" : ""
          }`}
        >
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => handleSwitcherClick("login")}
          >
            <AccountCircle sx={{ mr: 1, my: 2.5 }}></AccountCircle>
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLogin}>
            {submitLogSuccess && (
              <Alert variant="filled" severity="success">
                Login successful! Welcome! Proceed to our store!
              </Alert>
            )}
            {submitErrorLog && (
              <Alert variant="filled" severity="error">
                Error: {submitErrorLog}
              </Alert>
            )}
            <div className="image-container">
              <img src={TitanLogo} alt="My Image" className="img1" />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3 className="animate-charcter"> Login PAGE</h3>
                </div>
              </div>
            </div>
            <Box sx={{ padding: 10 }}>
              <AccountCircleIcon
                sx={{ color: "action.active", mr: 1, my: 3.5 }}
              />
              <TextField
                label="Username"
                variant="standard"
                type="Usermame"
                required
                className="box-1"
                onChange={(e) => setUsername(e.target.value)}
              />
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 3.5 }} />
              <TextField
                label="E-mail"
                variant="standard"
                type="email"
                required
                className="box-1"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box sx={{ display: "flex" }}>
                <LockIcon sx={{ color: "action.active", mr: 1, my: 2.5 }} />
                <TextField
                  htmlFor="login-password"
                  id="login-password"
                  type="password"
                  required
                  label="Password"
                  variant="standard"
                  className="box-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </Box>
            <p className="pclass">Don't have an account? Click here to </p>
            <p
              className="pclass2"
              onClick={() => handleSwitcherClick("signup")}
            >
              Sign up
            </p>

            <button type="submit" className="btn-login">
              <a
                href="#_"
                className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative text-white">Login</span>
              </a>
            </button>
          </form>
        </div>
        <div
          className={`form-wrapper ${
            activeForm === "signup" ? "is-active" : ""
          }`}
        >
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => handleSwitcherClick("signup")}
          >
            <HowToRegRoundedIcon sx={{ mr: 1, my: 2.5 }}></HowToRegRoundedIcon>
            Sign Up
            <span className="underline"></span>
          </button>
          <form className="form form-signup" onSubmit={handleSubmit}>
            {submitSuccess && (
              <Alert variant="filled" severity="success">
                Registration successful! Please check your email for
                verification.
              </Alert>
            )}
            {submitError && (
              <Alert variant="filled" severity="error">
                Error: {submitError}
              </Alert>
            )}

            <fieldset>
              <div className="image-container">
                <img src={TitanLogo2} alt="My Image" className="img1" />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h3 className="animate-charcter"> Signup Page</h3>
                  </div>
                </div>
              </div>
              <Box sx={{ padding: 10 }}>
                <AccountCircleIcon
                  sx={{ color: "action.active", mr: 1, my: 3.5 }}
                />
                <TextField
                  label="Username"
                  variant="standard"
                  type="Usermame"
                  required
                  className="box-1"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <EmailIcon sx={{ color: "action.active", mr: 1, my: 2.5 }} />
                <TextField
                  id="signup-email"
                  label="E-mail"
                  variant="standard"
                  type="email"
                  placeholder="Email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="box-1"
                />
                <Box>
                  <LockIcon sx={{ color: "action.active", mr: 1, my: 2.5 }} />
                  <TextField
                    htmlFor="login-password"
                    position="start"
                    id="signup-password"
                    type="password"
                    required
                    label="Password"
                    variant="standard"
                    className="box-1"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <PasswordRoundedIcon
                    sx={{ color: "action.active", mr: 1, my: 3 }}
                  />
                  <TextField
                    htmlFor="signup-password-confirm"
                    position="start"
                    id="signup-password-confirm"
                    type="password"
                    required
                    label="Confirm Password"
                    variant="standard"
                    className="box-1"
                    defaultValue={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Box>
              </Box>
              <p className="pclass">Have an account already? Click here to </p>
              <p
                className="pclass2"
                onClick={() => handleSwitcherClick("login")}
              >
                Login
              </p>
            </fieldset>
            <button type="submit" disabled={submitting}>
              <a
                href="#_"
                className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
              >
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                  <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <span className="relative text-white">
                  {submitting ? "Submitting..." : "Sign Up"}
                </span>
              </a>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FormSwitch;
