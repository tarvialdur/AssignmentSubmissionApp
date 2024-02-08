import { useState, useEffect } from "react";
//import jwt_decode from "jwt-decode";
import { jwtDecode as jwt_decode } from "jwt-decode"; 
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import Dashboard from "./Dashboard";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import CodeReviewAssignmentView from "./CodeReviewAssignmentView";
import { UserProvider, useUser }  from "./UserProvider";


function App() {
  //const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState([]);
  const user = useUser(); 

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [user.jwt]);
  
function getRolesFromJWT(){
  if(user.jwt){
    const decodedJwt = jwt_decode(user.jwt);
    return decodedJwt.authorities;
  } 
  return [];

  // get role from jwt and assign via setRole() 
}

  // in return statement is the VIEW to the webpage
  // above the return statement is the code that supports the view
  return ( 
 
    <Routes>
      <Route 
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
          <PrivateRoute >
           <CodeReviewerDashboard /> 
          </PrivateRoute> 
            
          ) : (
          <PrivateRoute >
          <Dashboard /> 
         </PrivateRoute>
        )
      }
      />
      <Route 
          path="/assignments/:assignmentId"
          element={
            roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewAssignmentView />
              </PrivateRoute>
              ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
              )
          }
      />
      <Route path="login" element={<Login />} />
      <Route 
        path="/" 
        element={<Homepage/> } 
        />
    </Routes>

  );
  }

export default App;