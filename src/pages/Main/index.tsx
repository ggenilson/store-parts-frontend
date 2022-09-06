import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table, { TableColumnProps } from "../../components/Table";
import useDebounce from "../../hooks/useDebounce";
import api from "../../services/api";
import {
  filterParts,
  filterPartsByType,
  orderPartsByPrice,
  removeDuplicateObjects,
} from "../../utils/filterParts";
import { FiltersContainer, Input } from "./styles";

interface ISelect {
  value: string;
  label: string;
}

export interface IParts {
  name: string;
  price: string;
  type: string;
}

type TypesProps = Array<ISelect>;

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<IParts[]>([]);
  const [types, setTypes] = useState<TypesProps>([]);
  const [selectedTypeOption, setSelectedTypeOption] = useState<ISelect>();
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState<TypesProps>([
    { value: "up", label: "up" },
    { value: "down", label: "down" },
  ]);
  const [selectedPriceOrder, setSelectedPriceOrder] = useState<ISelect>();

  const handleGetTypes = async () => {
    const result = await api.get("/store/part-types");

    if (result.data) {
      const resTypes = result.data.map((type: string) => ({
        value: type.toLowerCase(),
        label: type,
      }));

      setTypes(resTypes);
    }
  };

  const handleGetParts = async () => {
    setLoading(true);

    const result = await api.get("/store/parts");

    if (result.data) {
      setParts(result.data);
    }

    setLoading(false);
  };

  const columns: TableColumnProps<IParts>[] = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Type",
      value: "type",
    },
    {
      label: "Price",
      value: "price",
    },
  ];

  useEffect(() => {
    handleGetTypes();
    handleGetParts();
  }, []);

  const debouncedValue = useDebounce<string>(search, 400);
  let filteredParts: IParts[] = [];

  if (search.length) {
    filteredParts = filterParts(parts, debouncedValue.toLocaleLowerCase());
  }

  if (selectedTypeOption) {
    filteredParts = [
      ...filteredParts,
      ...filterPartsByType(parts, selectedTypeOption.value),
    ];
  }

  if (selectedPriceOrder) {
    filteredParts = orderPartsByPrice(filteredParts, selectedPriceOrder.value);
  }

  if (filteredParts.length) {
    filteredParts = removeDuplicateObjects(filteredParts);
  }

  return (
    <>
      <FiltersContainer>
        <Input
          placeholder="search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          options={types}
          placeholder="type"
          className="select-type"
          value={selectedTypeOption}
          onChange={(e) => setSelectedTypeOption(e!)}
        />

        <Select
          options={priceOrder}
          placeholder="price order"
          className="select-type"
          value={selectedPriceOrder}
          onChange={(e) => setSelectedPriceOrder(e!)}
        />
      </FiltersContainer>

      <Table
        {...{
          columns,
          data: filteredParts.length ? filteredParts : parts,
          loading,
        }}
      />
    </>
  );
};

export default MainPage;
