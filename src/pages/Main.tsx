import React, { useEffect, useState } from "react";
import Table, { TableColumnProps } from "../components/Table";
import api from "../services/api";

interface IParts {
  name: string;
  price: string;
  type: "Mouse" | "Keyboard" | "Monitor" | "Mousepad";
}

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<IParts[]>([]);

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
    handleGetParts();
  }, []);

  return (
    <>
      <Table {...{ columns, data: parts, loading }} />
    </>
  );
};

export default MainPage;
