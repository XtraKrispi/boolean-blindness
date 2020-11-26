import styled from "styled-components";

export const CenteredDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Container = styled.div`
  padding: 60px 35px 35px 35px;
  border-radius: 40px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

export const TextBox = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  color: #555;
  padding: 20px 10px 20px 5px;
  padding-left: 30px;

  margin-bottom: 30px;
  margin-right: 10px;
  border-radius: 25px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
`;
