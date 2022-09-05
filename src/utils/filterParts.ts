import { IParts } from "../pages/Main";

export const filterParts = (data: IParts[], search: string) => {
  const filteredParts = data.filter(
    ({ name, price, type }) =>
      name.toLocaleLowerCase().includes(search) ||
      price.toLocaleLowerCase().includes(search) ||
      type.toLocaleLowerCase().includes(search)
  );

  return filteredParts;
};

export const filterPartsByType = (data: IParts[], search: string) => {
  const filteredPartsByType = data.filter(
    ({ type }) => type.toLocaleLowerCase() === search
  );

  return filteredPartsByType;
};
