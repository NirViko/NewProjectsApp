import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Email from "./input/email";
import Password from "./input/password";
import store from "../redux/store";
import { useHistory } from "react-router-dom";
import { LoginConteinerStyled } from "./Styles";

interface LoginProps {
  isEmailValid: Boolean;
  isPasswordValid: Boolean;
  usernameValue: string;
  passwordValue: string;
  tokenValue: string;
}

//Get from the Store value that checks if the password and username are valid
function mapStateToProps(state: any) {
  return {
    isEmailValid: state.isEmailValid,
    isPasswordValid: state.isPasswordValid,
    usernameValue: state.user.emailValue,
    passwordValue: state.user.passwordValue,
    tokenValue: state.tokenObject.tokenValue,
  };
}

//Login page
export default connect(mapStateToProps)(function Login(props: LoginProps) {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const {
    isEmailValid,
    isPasswordValid,
    usernameValue,
    passwordValue,
    tokenValue,
  } = props;

  useEffect(() => {
    if (isEmailValid && isPasswordValid) setIsButtonDisabled(false);
    else {
      setIsButtonDisabled(true);
    }
  }, [isEmailValid, isPasswordValid]);

  const history = useHistory();

  useEffect(() => {
    if (tokenValue !== "") history.push("/info");
  }, [history, tokenValue]);

  function postUserData() {
    setIsLoadingData(true);
    axios
      .post("https://private-052d6-testapi4528.apiary-mock.com/authenticate", {
        username: usernameValue,
        password: passwordValue,
      })
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          store.dispatch({ type: "SET_TOKEN", payload: response.data[0] });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <LoginConteinerStyled>
        <Email />
        <Password />
        <LoadingButton
          size="large"
          onClick={postUserData}
          loading={isLoadingData}
          disabled={isButtonDisabled}
          loadingIndicator="Loading..."
          variant="outlined"
        >
          LOGIN
        </LoadingButton>
      </LoginConteinerStyled>
    </>
  );
});
