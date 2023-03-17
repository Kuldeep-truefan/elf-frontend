import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({component:RouteComponent}) => {
  const [authToken]= useAuth()
  return authToken?<RouteComponent/>:<Navigate to="/login"/>
};

export default PrivateRoute;