import React from "react";
import Navbar from "./components/Navbar";
import { UserProvider } from "./pages/context/UserContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <Navbar />
    </UserProvider>
  );
};

export default App;
