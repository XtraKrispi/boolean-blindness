import React, { useState } from "react";
import { Checkbox, CenteredDisplay, Container, TextBox } from "../helpers";
import { Display } from "./Demo1.styles";

type Yelling = "Yelling" | "Not Yelling";
type Questioning = "Questioning" | "Not Questioning";

const giveSpeech = (
  txt: string,
  yelling: Yelling,
  questioning: Questioning
) => {
  return `${yelling === "Yelling" ? txt.toUpperCase() : txt}${
    questioning === "Questioning" ? "?" : ""
  }`;
};

export const Demo1 = () => {
  const [txt, setTxt] = useState("");
  const [yelling, setYelling] = useState<Yelling>("Not Yelling");
  const [questioning, setQuestioning] = useState<Questioning>(
    "Not Questioning"
  );
  return (
    <CenteredDisplay>
      <Container>
        <TextBox value={txt} onChange={(e) => setTxt(e.target.value)} />
        <Checkbox
          label="Yelling"
          checked={yelling === "Yelling"}
          onChange={() =>
            setYelling(yelling === "Yelling" ? "Not Yelling" : "Yelling")
          }
        />
        <Checkbox
          label="Questioning"
          checked={questioning === "Questioning"}
          onChange={() =>
            setQuestioning(
              questioning === "Questioning" ? "Not Questioning" : "Questioning"
            )
          }
        />
        <Display>{giveSpeech(txt, yelling, questioning)}</Display>
      </Container>
    </CenteredDisplay>
  );
};
