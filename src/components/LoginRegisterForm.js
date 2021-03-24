import React, { useState } from "react";

import Register from "./Register";
import Login from "./Login";
import { Container } from "semantic-ui-react";

function LoginRegisterForm() {
  const [toggle, setToggle] = useState(true);

  const changeToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <Container>
        {toggle ? (
          <Register changeToggle={changeToggle} />
        ) : (
          <Login changeToggle={changeToggle} />
        )}
      </Container>
    </div>
  );
}

export default LoginRegisterForm;
