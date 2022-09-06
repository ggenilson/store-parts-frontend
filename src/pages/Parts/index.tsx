import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Table/styles";
import usePart from "../../hooks/useParts";
import { Container, Info } from "./styles";

const PartsPage: React.FC = () => {
  const { partName } = useParams();

  const { loading, part } = usePart(partName!);

  console.log(partName);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Info>
        <h3>name:</h3>
        <span>{part?.name}</span>
      </Info>

      <Info>
        <h3>type:</h3>
        <span>{part?.type}</span>
      </Info>

      <Info>
        <h3>price:</h3>
        <span>{part?.price}</span>
      </Info>
    </Container>
  );
};

export default PartsPage;
