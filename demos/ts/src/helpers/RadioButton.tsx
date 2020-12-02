import React from "react";
import styled from "styled-components";

const RadioButtonInput = styled.input`
  position: absolute;
  left: -9999px;
`;

const RadioButtonLabel = styled.label`
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

export const RadioButton: React.FC<{
  label: string;
  name: string;
  checked: boolean;
  onChange?: () => void;
}> = ({ label, name, onChange, checked }) => {
  return (
    <>
      <RadioButtonLabel checked={checked}>
        <RadioButtonInput
          type="radio"
          checked={checked}
          name={name}
          onChange={() => (onChange ? onChange() : null)}
        />
        {label}
      </RadioButtonLabel>
    </>
  );
};
