import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Table/styles";
import { PartContext } from "../../contexts";
import usePart from "../../hooks/useParts";

const usePartsPageState = () => {
  const { partName } = useParams();
  const { part, setPart } = useContext(PartContext);
  const { loading, part: requestPart } = usePart(partName!);

  const getLoader = () => {
    if (loading && !part) {
      return <Loader />;
    }
  };

  useEffect(() => {
    if (!loading && !part) {
      setPart(requestPart);
    }
  }, [loading]);

  return { part, setPart, loading, requestPart, getLoader };
};

export default usePartsPageState;
