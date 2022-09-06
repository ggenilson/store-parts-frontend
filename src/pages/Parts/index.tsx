import React from "react";

import usePartsPageState from "./state";
import { Container, Info } from "./styles";

const PartsPage: React.FC = () => {
  const { part, getLoader } = usePartsPageState();

  return (
    <Container>
      <Info>
        <h3>name:</h3>
        <span>{part?.name}</span>
        {getLoader()}
      </Info>

      <Info>
        <h3>type:</h3>
        <span>{part?.type}</span>
        {getLoader()}
      </Info>

      <Info>
        <h3>price:</h3>
        <span>{part?.price}</span>
        {getLoader()}
      </Info>
    </Container>
  );
};

export default PartsPage;
