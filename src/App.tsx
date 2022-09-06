import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import PartsPage from "./pages/Parts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/parts">
          <Route index element={<PartsPage />} />
          <Route path=":partName" element={<PartsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
