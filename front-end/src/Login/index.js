import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
            const reqBody = {
              username: username,
              password: password,
            };
        
           
            fetch("/api/auth/login", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(reqBody),
            })
            .then((response) => {
                if(response.status === 200)
                    return Promise.all([response.json(), response.headers]);
                else
                    return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
              setJwt(headers.get("authorization"));
              window.location.href = "dashboard";
          })
          .catch((message) => {
            alert(message);
          });
    }




    return (



      <>
      <Container className="mt-5" border="5px" >


        <Row className="justify-content-center">
          
          <Col md="8" lg="6">
            <h1 className="mb-4">Sign in</h1>
        <Form.Group className="mb-3"  controlId="username">
              <Form.Label className="fs-4">
                Username
              </Form.Label>
              <Form.Control
              type="email" 
              size="lg"
              placeholder="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>


          <Row className="justify-content-center">
            <Col md="8" lg="6">
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fs-4">Password</Form.Label>
            <Form.Control 
            type="password"
            size="lg"
            placeholder="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
            </Col>
          </Row>


          <Row className="justify-content-center">
            <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between">
              <Button 
                id="submit" 
                type="button" 
                onClick={() => sendLoginRequest()}
                size="lg"
                >
                Login
              </Button>
              <Button 
                variant="secondary"
                type="button" 
                onClick={() =>{window.location.href ="/";
              }}
                size="lg"
                >
                Exit
              </Button>
          </Col>
        </Row>
      </Container>
        </>
    );
};

export default Login;

