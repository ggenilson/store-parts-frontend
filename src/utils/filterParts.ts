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

export const orderPartsByPrice = (data: IParts[], type: string) => {
  if (type === "up") {
    return data.sort((a, b) => {
      const firstNumber = parseFloat(a.price.replace("$", ""));
      const secondNumber = parseFloat(b.price.replace("$", ""));

      return firstNumber - secondNumber;
    });
  }

  return data.sort((a, b) => {
    const firstNumber = parseFloat(a.price.replace("$", ""));
    const secondNumber = parseFloat(b.price.replace("$", ""));

    return secondNumber - firstNumber;
  });
};

export const removeDuplicateObjects = (array: IParts[]) => {
  return [...new Set(array.map((s) => JSON.stringify(s)))].map((s) =>
    JSON.parse(s)
  );
};
