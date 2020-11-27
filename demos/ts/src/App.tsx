import React, { useState } from "react";
import "./App.css";
import { Demo1 } from "./demos/Demo1";
import { Demo2 } from "./demos/Demo2";
import styled from "styled-components";
import { Demo3 } from "./demos/Demo3";
import { Demo4 } from "./demos/Demo4";

const ListView = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 10px;
`;

const ListItem = styled.li`
  margin-right: 20px;
  cursor: pointer;
  padding: 20px;
  user-select: none;

  border-radius: 137px;

  ${(props: { active?: boolean }) =>
    props.active
      ? `background: #ffffff;
      box-shadow: inset 9px 9px 15px #c2c2c2, 
            inset -9px -9px 15px #ffffff;`
      : `background: linear-gradient(145deg, #ffffff, #e6e6e6);
      box-shadow:  9px 9px 15px #c2c2c2, 
                   -9px -9px 15px #ffffff;`}

  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & > div:first-child {
    margin-bottom: 30px;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const components = [
    ["Demo 1", <Demo1 />],
    ["Demo 2", <Demo2 />],
    ["Demo 3", <Demo3 />],
    ["Demo 4", <Demo4 />],
  ];

  return (
    <Container>
      <div>
        <ListView>
          {components.map(([txt, _], idx) => (
            <ListItem
              key={idx}
              onClick={() => setActiveTab(idx)}
              active={idx === activeTab}
            >
              {txt}
            </ListItem>
          ))}
        </ListView>
      </div>
      <div>{components[activeTab][1]}</div>
    </Container>
  );
}

export default App;
