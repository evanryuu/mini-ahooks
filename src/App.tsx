import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AxiosHeaders } from "axios";
import MyComponent from "./components/VirtualList";

function App() {
  const [count, setCount] = useState(0);
  console.log(new AxiosHeaders({ "X-Data": "123" }));
  return (
    <>
      <MyComponent />
    </>
  );
}

export default App;
