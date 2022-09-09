import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import PartsPage from "./pages/Parts";

import PartProvider from "./contexts/PartsContext";

const App: React.FC = () => {
  return (
    <PartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/parts">
            <Route index element={<PartsPage />} />
            <Route path=":partName" element={<PartsPage />} />
          </Route>
        </Routes>
      </Router>
    </PartProvider>
  );
};

export default App;
