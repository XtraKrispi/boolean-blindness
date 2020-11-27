import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { Button, DataPanel, LoadingIndicator } from "./Styles";

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

interface Film {
  title: string;
  episode_id: number;
  release_date: string;
}

interface Model {
  data: Film[];
  isLoading: boolean;
  errorMessage: string;
}

type Action<T> =
  | { type: "LOADING" }
  | { type: "FAILED"; error: string }
  | { type: "SUCCESS"; data: T };

const reducer = (state: Model, action: Action<Film[]>): Model => {
  switch (action.type) {
    case "FAILED":
      return { ...state, errorMessage: action.error };
    case "LOADING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return { ...state, data: action.data };
  }
};

export const Demo2 = () => {
  const [model, dispatch] = useReducer(reducer, {
    data: [],
    isLoading: false,
    errorMessage: "",
  });

  const [shouldFail, setShouldFail] = useState(false);

  const makeRequest = (fail: boolean) => {
    dispatch({ type: "LOADING" });
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((d) => {
        if (fail) {
          throw new Error("FAILED");
        }
        setTimeout(() => {
          dispatch({ type: "SUCCESS", data: d.results });
        }, 3000);
      })
      .catch((e) => dispatch({ type: "FAILED", error: e.toString() }));
  };

  return (
    <Container>
      <InnerPanel>
        <Button
          onClick={() => makeRequest(shouldFail)}
          style={{ marginBottom: "20px" }}
        >
          Load Data
        </Button>
        <Checkbox
          checked={shouldFail}
          label="Fail the fetch?"
          onChange={() => setShouldFail(!shouldFail)}
        />
        {model.isLoading && <LoadingIndicator className="loading" />}
        {model.errorMessage && <div>{model.errorMessage}</div>}
        {!!model.data.length && (
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
                {model.data.map((d) => (
                  <tr>
                    <td>{d.title}</td>
                    <td>{d.episode_id}</td>
                    <td>{d.release_date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </DataPanel>
        )}
      </InnerPanel>
    </Container>
  );
};
