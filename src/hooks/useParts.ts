import { useEffect, useState } from "react";
import { IParts } from "../pages/Main/state";
import api from "../services/api";

function usePart(name: string) {
  const [loading, setLoading] = useState(false);
  const [part, setPart] = useState<IParts>();

  const handleGetParts = async () => {
    setLoading(true);

    const result = await api.get("/store/parts");

    if (result.data) {
      const data = result.data as IParts[];

      const findPart = data.find((part) => part.name.replace(" ", "") === name);

      setPart(findPart);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetParts();
  }, [name]);

  return { part, loading };
}

export default usePart;
