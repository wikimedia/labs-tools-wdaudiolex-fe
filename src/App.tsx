import React from "react";
import Header from "./layout/Header";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Header /> {/* Header component */}
      <Navbar />
    </>
  );
};

export default App;
