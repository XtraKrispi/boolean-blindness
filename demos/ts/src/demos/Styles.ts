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

export const Button = styled.div`
  cursor: pointer;
  user-select: none;
  border-radius: 91px;
  background: linear-gradient(145deg, #fdffff, #d4d8db);
  box-shadow: 5px 5px 10px #b3b6b9, -5px -5px 10px #ffffff;
  border: 0;
  padding: 10px;
  text-align: center;
  display: ${({ inline }: { inline?: boolean }) =>
    inline ? "inline-block" : "block"};
`;

export const LoadingIndicator = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 10px;

  &:before {
    font-size: 5px;
  }
`;

export const DataPanel = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  padding: 20px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #555;
  &:hover {
    text-decoration: underline;
  }
`;
