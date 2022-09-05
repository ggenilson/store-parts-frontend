import Spinner from "react-spinners/ClipLoader";
import styled from "styled-components";

interface ColumnProps {
  clamp?: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
`;

export const Info = styled.p`
  display: flex;
  flex-direction: ${(props) => props.defaultValue};
  gap: 15px;
  font-size: 20px;
  align-items: center;
  width: 100%;
`;

export const BaseTable = styled.table`
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;

  @media (max-width: 975px) {
    & {
      border: none;
    }

    &,
    tbody,
    tr,
    td {
      display: block;
      width: 100%;
    }

    tr {
      border: 1px solid #ccc;
      margin-bottom: 15px;

      &:last-child > td {
        border-bottom: 1px solid #ccc;
      }
    }

    td {
      padding-left: 50%;
      text-align: right;
      position: relative;
      border-bottom: 1px solid #ccc;
    }

    td:before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 15px;
      text-align: left;
      font-weight: 700;
    }
  }
`;

export const TableHeader = styled.thead`
  width: 100%;
  /* position: sticky; */
  top: 63px;
  z-index: 200;

  @media (max-width: 975px) {
    display: none;
  }
`;

export const HeaderColumn = styled.td`
  padding: 15px;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  background-color: #ccc;
  font-weight: bold;
  color: orange;
`;

export const HeaderRow = styled.tr``;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const Row = styled.tr`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #fff;

  &:last-child > td {
    border-bottom: none;
  }

  &:hover td {
    transition: all 0.2s ease-in-out;
    background-color: #ccc;
  }
`;

export const Column = styled.td<ColumnProps>`
  padding: 15px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  color: orange;
  font-weight: 500;

  ${({ clamp }) =>
    clamp &&
    `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: ${clamp}px;`}
`;

export const EmptyColumn = styled.td.attrs({ colSpan: 100 })`
  padding: 15px !important;
  text-align: center !important;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  color: orange;
  font-weight: 600;
`;

export const LoaderContainer = styled.td.attrs({ colSpan: 100 })`
  padding: 15px;
  flex: 1;
  text-align: center;
`;

export const Loader = styled(Spinner).attrs({
  size: 18,
  color: "orange",
})``;
