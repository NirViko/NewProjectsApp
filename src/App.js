import "./App.css";
import Login from "./components/login";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Info from "./components/info";
import { AppContainerStyled } from "./components/Styles";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <AppContainerStyled>
              <Login />
            </AppContainerStyled>
          </Route>
          <Route exact path="/info">
            <Info />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
