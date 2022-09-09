import React from "react";
import Select from "react-select";
import Table from "../../components/Table";
import useMainPageState from "./state";
import { FiltersContainer, Input } from "./styles";

const MainPage: React.FC = () => {
  const {
    search,
    setSearch,
    types,
    selectedTypeOption,
    filteredParts,
    loading,
    onRowClick,
    parts,
    selectedPriceOrder,
    setSelectedPriceOrder,
    setSelectedTypeOption,
    priceOrder,
    columns,
  } = useMainPageState();

  return (
    <>
      <FiltersContainer>
        <Input
          placeholder="search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="input-search"
        />

        <Select
          options={types}
          placeholder="type"
          className="select-type"
          value={selectedTypeOption}
          onChange={(e) => setSelectedTypeOption(e!)}
          data-testid="input-type"
        />

        <Select
          options={priceOrder}
          placeholder="price order"
          className="select-type"
          value={selectedPriceOrder}
          onChange={(e) => setSelectedPriceOrder(e!)}
          data-testid="input-price-order"
        />
      </FiltersContainer>

      <Table
        {...{
          columns,
          data: filteredParts.length ? filteredParts : parts,
          loading,
          onRowClick,
        }}
      />
    </>
  );
};

export default MainPage;
