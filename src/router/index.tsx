import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import { DashboardPage, NewUserPage } from "~/pages";

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={DashboardPage} />
          <Route exact path={routes.newUser} component={NewUserPage} />
          <Route
            exact
            path={routes.history}
            component={() => <div>History</div>}
          />

          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
