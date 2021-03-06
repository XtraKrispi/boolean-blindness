import React, { useReducer, useState } from "react";
import { Checkbox, Button, DataPanel, LoadingIndicator } from "../helpers";
import { Container, InnerPanel, Table } from "./Demo2.styles";

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
          dispatch({
            type: "SUCCESS",
            data: d.results.map(({ title, episode_id, release_date }: any) => ({
              title,
              episode_id,
              release_date,
            })),
          });
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
        <div>
          <pre>{JSON.stringify(model, null, 2)}</pre>
        </div>
      </InnerPanel>
    </Container>
  );
};
