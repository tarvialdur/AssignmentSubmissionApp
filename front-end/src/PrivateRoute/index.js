import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Navigate } from "react-router-dom"; 
 
const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    //check if jwt is present. if it is, then render the children(dashboard for ex.) if not, direct to login page
    return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;