import React, { useState } from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";

// | STYLING STUFF BEGINS
const CenteredDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  padding: 60px 35px 35px 35px;
  border-radius: 40px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

const TextBox = styled.input`
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

const Display = styled.p`
  font-size: 30px;
  color: #666;
  padding: 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 14px;
  background: #ecf0f3;
  box-shadow: inset 14px 14px 20px #d0d3d6, inset -14px -14px 20px #ffffff;
`;

// | STYLING STUFF ENDS

const giveSpeech = (txt: string, yelling: boolean, questioning: boolean) => {
  return `${yelling ? txt.toUpperCase() : txt}${questioning ? "?" : ""}`;
};

export const Demo1 = () => {
  const [txt, setTxt] = useState("");
  const [yelling, setYelling] = useState(false);
  const [questioning, setQuestioning] = useState(false);
  return (
    <CenteredDisplay>
      <Container>
        <TextBox value={txt} onChange={(e) => setTxt(e.target.value)} />
        <Checkbox
          label="Yelling"
          checked={yelling}
          onChange={() => setYelling(!yelling)}
        />
        <Checkbox
          label="Questioning"
          checked={questioning}
          onChange={() => setQuestioning(!questioning)}
        />
        <Display>{txt}</Display>
      </Container>
    </CenteredDisplay>
  );
};
