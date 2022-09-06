import React from "react";
import { useParams } from "react-router-dom";

const PartsPage: React.FC = () => {
  const { partName } = useParams();
  console.log(partName);

  return <h1>Parts Page</h1>;
};

export default PartsPage;
