import React from "react";
import Users from "./Pages/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewUser from "./Pages/NewUser";
import EditUser from "./Pages/EditUser";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<NewUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
