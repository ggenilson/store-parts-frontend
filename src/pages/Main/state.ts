import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableColumnProps } from "../../components/Table";
import useDebounce from "../../hooks/useDebounce";
import api from "../../services/api";
import {
  filterParts,
  filterPartsByType,
  orderPartsByPrice,
  removeDuplicateObjects,
} from "../../utils/filterParts";

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

const priceOrder: TypesProps = [
  { value: "up", label: "up" },
  { value: "down", label: "down" },
];

const useMainPageState = () => {
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<IParts[]>([]);
  const [types, setTypes] = useState<TypesProps>([]);
  const [selectedTypeOption, setSelectedTypeOption] = useState<ISelect>();
  const [search, setSearch] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState<ISelect>();

  const navigate = useNavigate();

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

  const onRowClick = (row: IParts) => {
    navigate(`/parts/${row.name.replace(" ", "")}`);
  };

  return {
    loading,
    parts,
    filteredParts,
    search,
    setSearch,
    onRowClick,
    selectedPriceOrder,
    setSelectedPriceOrder,
    selectedTypeOption,
    setSelectedTypeOption,
    types,
    priceOrder,
    columns,
  };
};

export default useMainPageState;
