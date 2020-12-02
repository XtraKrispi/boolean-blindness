import React, { useState } from "react";
import { Checkbox, CenteredDisplay, Container, TextBox } from "../helpers";
import { Display } from "./Demo1.styles";

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
