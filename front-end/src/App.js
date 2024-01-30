import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";


function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
/*  
 
*/
  

  // in return statement is the VIEW to the webpage
  // above the return statement is the code that supports the view
  return ( 
    <Routes>
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
           <Dashboard /> 
          </PrivateRoute>
        }
      />
      <Route 
          path="/assignments/:id"
          element={
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
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