import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UsersPage from "./components/pages/UsersListPage";
import HomePage from "./components/pages/HomePage";
import Upload from "./components/pages/UploadPage";
import LoginPage from "./components/pages/LoginPage";
import CountPage from "./components/pages/CountPagePro";
import ProtectedRoute from "./components/higher-order/ProtectedRoute";
import { useAuth } from "./context/Auth/AuthHooks";
import TaskPage from "./components/pages/TaskPage";

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Router>
      <Switch>
        <Route path="/upload" component={Upload} exact />
        <Route path="/users" component={UsersPage} exact />
        <Route path="/count" component={CountPage} exact />
        <ProtectedRoute
          isAllowed={isLoggedIn}
          path="/tasks"
          component={TaskPage}
          redirect="/login"
          exact />
        <ProtectedRoute
          isAllowed={!isLoggedIn}
          path="/login"
          component={LoginPage}
          redirect={(location) => location.state.from.pathname}
          exact />
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  );
};

export default App;