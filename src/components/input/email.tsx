import React from "react";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import store from "../../redux/store";

interface TypeProps {
  emailValue: string;
  isEmailValid: Boolean;
}

function mapStateToProps(state: any) {
  return {
    emailValue: state.user.emailValue,
    isEmailValid: state.isEmailValid,
  };
}

export default connect(mapStateToProps)(function Email(props: TypeProps) {
  const { emailValue, isEmailValid } = props;

  function allEmailChecks(e: any) {
    var regularExpression = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var check = regularExpression.test(e.target.value);
    store.dispatch({ type: "SET_ISEMAILVALID", payload: check });
    store.dispatch({ type: "SET_EMAILVALUE", payload: e.target.value });
  }

  return (
    <>
      <TextField
        id="outlined-error"
        label="Email"
        defaultValue={emailValue}
        onChange={(e) => {
          allEmailChecks(e);
        }}
        {...(!isEmailValid &&
          emailValue !== "" && {
            error: true,
            helperText: "Invalid email address",
          })}
      />
    </>
  );
});
