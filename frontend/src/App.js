import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';

import Websocket from 'react-websocket';
import { useWebSocket } from 'react-websocket';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// client.interceptors.request.use(function (config) {
//     // Retrieve and set the CSRF token here
//     config.headers['X-CSRFToken'] = Cookies.get('csrftoken');
// 
//     const csrfToken = Cookies.get('csrftoken');
// 
//     console.log("XXX axios interceptors:" + csrfToken);    
//     return config;
// });


function App() {



  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(null);
  
 
  useEffect(() => {

    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
    

//////


    const ws = new WebSocket('ws://localhost:8000/ws/notifications/');

    ws.onopen = () => {
      console.log('Connected to notification websocket');
    };

    ws.onmessage = e => {
      console.log('onmessage:' + e.data);
      const data = JSON.parse(e.data);
      setMessage(data.message);
    };

    ws.onerror = e => {
      console.error('WebSocket error', e);
    };

    ws.onclose = e => {
      console.error('WebSocket closed', e);
    };

    return () => {
      ws.close();
    };



  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {


      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {

        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();

    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {

      setTimeout(() => {
          const csrftoken = Cookies.get('csrftoken');
          const sessionid = Cookies.get('sessionid');
          console.log("XXX /api/login csrftoken:" + csrftoken);    
          console.log("XXX /api/login sessionid:" + sessionid);  
          
          console.log('cookies', document.cookie)
          
        }, 100);      

        setCurrentUser(true);
    });    


  }

  function submitLogout(e) {
    e.preventDefault();

    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Django React</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        </div>
    );
  }
  return (
    <div>    
      {message && <p>{message}</p>}
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>React Django</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;
