import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { failure, loading, notAsked, RemoteData, success } from "./RemoteData";

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: #777;
`;

const InnerPanel = styled.div`
  width: 30vw;
  margin-top: 20px;
  border-radius: 30px;
  padding: 40px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DataPanel = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  padding: 20px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

const Button = styled.div`
  cursor: pointer;
  user-select: none;
  border-radius: 91px;
  background: linear-gradient(145deg, #fdffff, #d4d8db);
  box-shadow: 5px 5px 10px #b3b6b9, -5px -5px 10px #ffffff;
  border: 0;
  padding: 10px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  color: #555;
  border-spacing: 0;
  td {
    border: 0;
  }

  thead {
    th {
      padding-bottom: 10px;
    }
  }

  tbody {
    td {
      padding: 10px;
    }

    tr:nth-child(even) {
      background-color: #fff;
    }
  }
`;

const LoadingIndicator = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 10px;

  &:before {
    font-size: 5px;
  }
`;

interface Film {
  title: string;
  episode_id: number;
  release_date: string;
}

type Action<T> =
  | { type: "LOADING" }
  | { type: "FAILED"; error: string }
  | { type: "SUCCESS"; data: T };

const reducer = (
  _state: RemoteData<Film[], string>,
  action: Action<Film[]>
): RemoteData<Film[], string> => {
  switch (action.type) {
    case "FAILED":
      return failure(action.error);
    case "LOADING":
      return loading();
    case "SUCCESS":
      return success(action.data);
  }
};

export const Demo2 = () => {
  const [model, dispatch] = useReducer(
    reducer,
    notAsked() as RemoteData<Film[], string>
  );

  const [shouldFail, setShouldFail] = useState(false);

  const makeRequest = (fail: boolean) => {
    dispatch({ type: "LOADING" });
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((d) => {
        if (fail) {
          throw new Error("FAILED");
        }
        dispatch({ type: "SUCCESS", data: d.results });
      })
      .catch((e) => dispatch({ type: "FAILED", error: e.toString() }));
  };

  const content = ((model) => {
    switch (model.type) {
      case "FAILURE":
        return <div>{model.error}</div>;
      case "LOADING":
        return <LoadingIndicator className="loading"></LoadingIndicator>;
      case "NOTASKED":
        return null;
      case "SUCCESS":
        if (model.data.length > 0) {
          return (
            <DataPanel>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Episode #</th>
                    <th>Release Date</th>
                  </tr>
                </thead>
                <tbody>
                  {model.data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.title}</td>
                      <td>{d.episode_id}</td>
                      <td>{d.release_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </DataPanel>
          );
        } else {
          return <div>NO DATA</div>;
        }
    }
  })(model);

  return (
    <Container>
      <InnerPanel>
        <Button onClick={() => makeRequest(shouldFail)}>Load Data</Button>
        <Checkbox
          checked={shouldFail}
          label="Fail the fetch?"
          onChange={() => setShouldFail(!shouldFail)}
        />
        {content}
      </InnerPanel>
    </Container>
  );
};
