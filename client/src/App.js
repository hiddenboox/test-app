import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from "react";

import { UserProvider } from "./features/user/context/UserProvider";
import { Loader } from "./components/Loader";

const Home = React.lazy(() => import("./views/Home"));
const User = React.lazy(() => import("./views/User"));

export function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/user/:email">
              <User />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </React.Suspense>
  );
}
