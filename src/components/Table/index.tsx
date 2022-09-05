import React from "react";

import {
  BaseTable,
  Column,
  Container,
  EmptyColumn,
  HeaderColumn,
  HeaderRow,
  Info,
  Loader,
  LoaderContainer,
  Row,
  TableBody,
  TableHeader,
} from "./styles";

export interface TableColumnProps<T> {
  label: string;
  value: keyof T | ((data: T) => string | React.ReactNode);
  clamp?: number;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumnProps<T>[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
}

const Table: <T>(p: TableProps<T>) => React.ReactElement<T> = ({
  columns,
  data,
  loading,
  onRowClick,
}) => {
  return (
    <Container>
      {!loading && data.length && (
        <Info defaultValue={"row"}>{`Showing ${data.length} results`}</Info>
      )}
      <BaseTable>
        <TableHeader>
          <HeaderRow>
            {columns.map((column, index) => (
              <HeaderColumn key={index}>{column.label}</HeaderColumn>
            ))}
          </HeaderRow>
        </TableHeader>
        <TableBody>
          {!loading &&
            data.length &&
            data.map((row, index) => (
              <Row key={index} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map(({ value, clamp }, index) => (
                  <Column
                    key={index}
                    data-label={columns[index].label}
                    {...{ clamp }}
                  >
                    {typeof value === "function"
                      ? value(row)
                      : (row as any)[value]}
                  </Column>
                ))}
              </Row>
            ))}
          {!loading && !data.length && (
            <Row>
              <EmptyColumn>No data found</EmptyColumn>
            </Row>
          )}
          {loading && (
            <Row>
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            </Row>
          )}
        </TableBody>
      </BaseTable>
    </Container>
  );
};

export default Table;
