import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>🚀 Welcome to My Vite + React App</h1>
      <p>Click the button to increase the counter:</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default App;
