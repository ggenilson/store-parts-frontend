import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table, { TableColumnProps } from "../../components/Table";
import useDebounce from "../../hooks/useDebounce";
import api from "../../services/api";
import { filterParts } from "../../utils/filterParts";
import { FiltersContainer, Input } from "./styles";

export interface IParts {
  name: string;
  price: string;
  type: "Mouse" | "Keyboard" | "Monitor" | "Mousepad";
}

type TypesProps = Array<{ value: string; label: string }>;

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<IParts[]>([]);
  const [types, setTypes] = useState<TypesProps[]>([]);
  const [search, setSearch] = useState("");

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
  const filteredParts = filterParts(parts, debouncedValue.toLocaleLowerCase());

  return (
    <>
      <FiltersContainer>
        <Input
          placeholder="search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select options={types} />
      </FiltersContainer>

      <Table
        {...{
          columns,
          data: search.length > 0 ? filteredParts : parts,
          loading,
        }}
      />
    </>
  );
};

export default MainPage;
