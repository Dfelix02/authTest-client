import "./App.css";
import "semantic-ui-css/semantic.min.css";

import LoginRegisterForm from "./components/LoginRegisterForm";

function App() {
  return (
    <div className="background">
      <div className="app">
        <LoginRegisterForm />
      </div>
    </div>
  );
}

export default App;
