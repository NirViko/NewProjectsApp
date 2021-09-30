import React from "react";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import store from "../../redux/store";

interface TypeProps {
  passwordValue: string;
  isPasswordValid: Boolean;
}

function mapStateToProps(state: any) {
  return {
    passwordValue: state.user.passwordValue,
    isPasswordValid: state.isPasswordValid,
  };
}

export default connect(mapStateToProps)(function Password(props: TypeProps) {
  const { passwordValue, isPasswordValid } = props;

  function checkIfPasswordIsValid(e: any) {
    var regularExpression = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var checked = regularExpression.test(e.target.value);
    store.dispatch({ type: "SET_ISPASSWORDVALID", payload: checked });
    store.dispatch({ type: "SET_PASSWORDVALUE", payload: e.target.value });
  }

  return (
    <>
      <TextField
        id="outlined-error"
        label="Password"
        type="password"
        defaultValue={passwordValue}
        onChange={checkIfPasswordIsValid}
        {...(!isPasswordValid &&
          passwordValue !== "" && {
            error: true,
            helperText: "Invalid password",
          })}
      />
    </>
  );
});
