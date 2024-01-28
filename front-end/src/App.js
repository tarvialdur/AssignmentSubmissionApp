import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";


function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  
/*  
  useEffect(() => {
    if(!jwt) {
    const reqBody = {
      "username": "tarvi",
      "password": "asdfasdf"
    };

    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
    .then((response) => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      setJwt(headers.get("authorization"));
  });
  }
  }, [] ); 
*/

  useEffect(() => {
    console.log(`JWT is: ${jwt}`);
  }, [jwt]);
  


  // in return statement is the VIEW to the webpage
  // above the return statement is the code that supports the view
  return ( 
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route 
        path="/" 
        element={<Homepage/> } 
        />
    </Routes>
  );
}

export default App;