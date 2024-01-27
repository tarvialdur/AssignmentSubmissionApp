import { useEffect, useState } from 'react';
import './App.css';

function App() {
  console.log("Hello");

  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const reqBody = {
      "username": "tarvi",
      "password": "asdfasdf"
  };

  //fetch returns a promise (a response)
  fetch('/api/auth/login', {
    headers: {
      "Content-type": "application/json"
    },
    method: "post",
    body: JSON.stringify(reqBody),
  }) 
  .then((response) => Promise.all([response.json(), response.headers]))
  .then(([body, headers]) => {
    setJwt(headers.get("authorization"));
    
  });
  }, []);
  

  

    return <div className="App">
    <h1>Hello world</h1>
    <div>JWT Value is {jwt}</div>
    </div>;
    
}
export default App;
