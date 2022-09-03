import {
  Category,
  Dashboard,
  ImportExportRounded,
  Lock,
  VerifiedUser,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./Adminsidbar.css";
function Adminsidbar({ user, handleLogout }) {
  return (
    <div className="Adminsidbar">
      <Link to="/admin">
        <li className="admin-sidbar-li">
          <Dashboard /> Dashboard
        </li>
      </Link>
      <Link to="/addpro">
        <li className="admin-sidbar-li">
          <ImportExportRounded />
          Product
        </li>
      </Link>
      <Link to="/admin_viewcat">
        <li className="admin-sidbar-li">
          <Category />
          View Category
        </li>
      </Link>

      <li className="admin-sidbar-li">
        <VerifiedUser />
        Users
      </li>
      {user ? (
        <>
          <li className="admin-sidbar-li">{user?.email}</li>

          <li className="admin-sidbar-li">
            <Link to="/login" onClick={handleLogout}>
              <Lock />
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Adminsidbar;
