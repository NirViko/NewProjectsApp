import produce from "immer";
import { createStore } from "redux";
import { TokenType } from "../components/CommonTypes";

interface IUserValues {
  emailValue: string;
  passwordValue: string;
}

interface InitialStateValues {
  user: IUserValues;
  isEmailValid: Boolean;
  isPasswordValid: Boolean;
  tokenObject: TokenType;
  isAuthenticated: Boolean;
}

const initialState: InitialStateValues = {
  user: {
    emailValue: "",
    passwordValue: "",
  },
  isEmailValid: false,
  isPasswordValid: false,

  tokenObject: {
    tokenValue: "",
    personalDetails: {
      nameValue: "",
      teamValue: "",
      joinedAtValue: "",
      avatarValue: "",
    },
  },
  isAuthenticated: false,
};

const reducer = produce((state: any, action: any) => {
  switch (action.type) {
    case "SET_EMAILVALUE":
      state.user.emailValue = action.payload;
      break;
    case "SET_PASSWORDVALUE":
      state.user.passwordValue = action.payload;
      break;
    case "SET_ISEMAILVALID":
      state.isEmailValid = action.payload;
      break;
    case "SET_ISPASSWORDVALID":
      state.isPasswordValid = action.payload;
      break;
    case "SET_TOKEN":
      state.tokenObject.tokenValue = action.payload.token;
      state.tokenObject.personalDetails.nameValue =
        action.payload.personalDetails.name;
      state.tokenObject.personalDetails.teamValue =
        action.payload.personalDetails.Team;
      state.tokenObject.personalDetails.joinedAtValue =
        action.payload.personalDetails.joinedAt;
      state.tokenObject.personalDetails.avatarValue =
        action.payload.personalDetails.avatar;

      break;
    case "SET_ISAUTHENTICATED":
      state.isAuthenticated = action.payload;
      break;
  }
}, initialState);

const store = createStore(reducer, initialState);

export default store;
