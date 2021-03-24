import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";

function Login({ changeToggle }) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3000/api/user/login", loginData)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data);
          setErrors(res.data.error);
        } else {
          localStorage.setItem("token", res.data);
          setEmail("");
          setPassword("");
          setErrors("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="ui olive primary button">
          Login
        </button>
        <button
          className="ui blue primary button align right"
          onClick={changeToggle}
        >
          register
        </button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;
