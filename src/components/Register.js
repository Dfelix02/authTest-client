import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";

function Register({ changeToggle }) {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };
    if (checkPasswords()) {
      let passwordChecker = 0;

      if (password.match(/[a-z]/)) {
        passwordChecker++;
      }
      if (/\d/.test(password)) {
        passwordChecker++;
      }
      if (password.match(/[|\\/~^:,;?!&%$@*+]/)) {
        passwordChecker++;
      }

      if (passwordChecker === 3) {
        axios
          .post("http://localhost:3000/api/user/register", loginData)
          .then((res) => {
            if (res.data.error) {
              setErrors(res.data.error);
            } else {
              localStorage.setItem("token", res.data);
              try {
                axios.post("http://localhost:3000/send_mail", { email });
              } catch (error) {
                console.log(error);
              }

              setName("");
              setPhone("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setErrors("");
            }
          })
          .catch((err) => console.log(err));
      } else {
        setErrors("password must contain an uppercase, lowercase and a symbol");
      }
    } else {
      setErrors("passwords must match");
    }
  };

  const checkPasswords = () => {
    return password === confirmPassword;
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Register</h1>
        <Form.Input
          label="Name"
          placeholder="Name.."
          name="name"
          type="text"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          label="Phone"
          placeholder="Phone.."
          name="phone"
          type="phone"
          value={phone}
          required
          onChange={(e) => {
            setPhone(e.target.value);
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type="submit" className="ui blue primary button">
          Register
        </button>
        <button className="ui blue primary button" onClick={changeToggle}>
          Login
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
export default Register;
