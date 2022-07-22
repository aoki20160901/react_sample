import React from "react";
import { Button } from '@material-ui/core';
import { useAuth } from "../../context/Auth/AuthHooks";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }
  return <div className="btn-logout"><Button onClick={handleLogout} variant="contained">ログアウト</Button></div>;
};

export default LogoutButton;