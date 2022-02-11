import React from "react";
import List from "./components/List";

const App = () => {
  return (
    <div className="antialiased rounded p-6 w-full h-screen bg-gray-50">
      <div className="w-full h-full rounded shadow overflow-hidden">
        <List />
      </div>
    </div>
  );
};

export default App;
