import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { initUser, getPosition } from "../../action/user";
import { setError, removeError } from "../../action/error";
import "./Navbar.css";
import Dialog from "../Dialog/Dialog";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AskForHelp from "../P2pPanel/AskForHelp";
import ProvideHelp from "../P2pPanel/ProvideHelp";

const server_url = 'http://wywe.azurewebsites.net'

function Navbar(props) {
  const [login, toggleLoginDialog] = useState(false);
  const [signup, toggleSignUpDialog] = useState(false);
  useEffect(() => {
    props.init();
  });
  const logo = <div>WHAT DO YOU WANT TO EAT?</div>;
  if (props.userName) {
    return (
      <nav>
        {logo}
        <div>Welcom back, {props.userName}</div>
        <div>
          <button
            className="nav-btn btn btn-light"
            onClick={() => {
              toggleLoginDialog(true);
            }}
          >
            Ask for help
          </button>
          <button
            className="nav-btn btn btn-light"
            onClick={() => toggleSignUpDialog(true)}
          >
            I'm willing to help
          </button>
        </div>
        <Dialog show={login} toggleShow={toggleLoginDialog}>
          <AskForHelp></AskForHelp>
        </Dialog>
        <Dialog show={signup} toggleShow={toggleSignUpDialog}>
          <ProvideHelp></ProvideHelp>
        </Dialog>
      </nav>
    );
  }

  return (
    <nav>
      {logo}
      <div>
        <button
          className="nav-btn btn btn-light"
          onClick={() => {
            console.log("clicked!");
            toggleLoginDialog(true);
          }}
        >
          login
        </button>
        <button
          className="nav-btn btn btn-light"
          onClick={() => toggleSignUpDialog(true)}
        >
          signup
        </button>
      </div>
      <Dialog show={login} toggleShow={toggleLoginDialog}>
        <LoginForm
          error={props.error}
          login={props.login}
          class="DialogContent"
        />
      </Dialog>
      <Dialog show={signup} toggleShow={toggleSignUpDialog}>
        <SignupForm
          setError={props.setError}
          error={props.error}
          signup={props.signup}
          class="DialogContent"
        />
      </Dialog>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userID: state.user.userID,
    error: state.error.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      fetch(server_url + "/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) throw new Error(data.error.message);
          dispatch(initUser(data));
          dispatch(removeError());
        })
        .catch((error) => {
          dispatch(setError(String(error)));
        });
    },
    init: () => {
      fetch(server_url + "/api/auth", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) throw new Error(data.error.message);
          dispatch(initUser(data));
          dispatch(removeError());
          dispatch(
            getPosition({
              latitude: 40,
              longitude: -77,
            })
          );
        })
        .catch((error) => {
          //do nothing
        });
    },
    signup: (user) => {
      fetch(server_url + "/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) throw new Error(data.error.message);
          dispatch(initUser(data));
          dispatch(removeError());
        })
        .catch((error) => {
          dispatch(setError(String(error)));
        });
    },
    setError: (error) => {
      dispatch(setError(error));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
