import React, { useState } from "react";

const giveSpeech = (txt: string, yelling: boolean, questioning: boolean) => {
  return `${yelling ? txt.toUpperCase() : txt}${questioning ? "?" : ""}`;
};

export const Demo1 = () => {
  const [txt, setTxt] = useState("");
  const [yelling, setYelling] = useState(false);
  const [questioning, setQuestioning] = useState(false);
  return (
    <div>
      <input value={txt} onChange={(e) => setTxt(e.target.value)} />
      <label htmlFor="yelling">Yelling: </label>
      <input
        type="checkbox"
        id="yelling"
        checked={yelling}
        onChange={() => setYelling(!yelling)}
      />
      <label htmlFor="questioning">Questioning:</label>
      <input
        type="checkbox"
        checked={questioning}
        id="questioning"
        onChange={() => setQuestioning(!questioning)}
      />
      <p></p>
    </div>
  );
};
