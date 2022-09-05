import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 20px;

  .select-type {
    width: 200px;
  }
`;

export const Input = styled.input`
  border-radius: 7px;
  outline: none;
  border: 1px solid #ccc;
  padding: 10px;
`;

export const Button = styled.button`
  border-radius: 7px;
  outline: none;
  border: 1px solid #ccc;
  font-weight: bold;
  padding: 10px;
  background-color: orange;
  cursor: pointer;
  color: #fff;
`;
