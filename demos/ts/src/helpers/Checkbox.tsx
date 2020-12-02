import React from "react";
import styled from "styled-components";

const CheckboxInput = styled.input`
  position: absolute;
  left: -9999px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;

  padding: 10px;
  margin-bottom: 20px;
  user-select: none;
  border-radius: 34px;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #d0d3d6, -14px -14px 20px #ffffff;
  cursor: pointer;

  ${(props: { checked: boolean }) =>
    props.checked
      ? "box-shadow: inset 14px 14px 20px #d0d3d6,       inset -14px -14px 20px #ffffff;"
      : null}
`;

export const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onChange?: () => void;
}> = ({ label, onChange, checked }) => {
  return (
    <CheckboxLabel checked={checked}>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={() => (onChange ? onChange() : null)}
      />
      {label}
    </CheckboxLabel>
  );
};
