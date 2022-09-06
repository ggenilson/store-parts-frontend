import React, { createContext, useState } from "react";
import { IParts } from "../pages/Main/state";

interface Props {
  children: React.ReactNode;
}

interface ContextDefaultValuesType {
  part: IParts | undefined;
  setPart: (value: IParts | undefined) => void;
}

const contextDefaultValues: ContextDefaultValuesType = {
  part: undefined,
  setPart: () => {},
};

export const PartContext =
  createContext<ContextDefaultValuesType>(contextDefaultValues);

const PartProvider: React.FC<Props> = ({ children }) => {
  const [part, sePart] = useState<IParts | undefined>(
    contextDefaultValues.part
  );

  const setPartData = (part: IParts | undefined) => sePart(part);

  return (
    <PartContext.Provider value={{ part, setPart: setPartData }}>
      {children}
    </PartContext.Provider>
  );
};

export default PartProvider;
