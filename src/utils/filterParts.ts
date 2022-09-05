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
