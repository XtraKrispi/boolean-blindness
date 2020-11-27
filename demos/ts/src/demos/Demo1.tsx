import React, { useState } from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { CenteredDisplay, Container, TextBox } from "./Styles";

// | STYLING STUFF BEGINS
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
