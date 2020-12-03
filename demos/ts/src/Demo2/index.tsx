import React, { useReducer, useState } from "react";
import {
  Checkbox,
  Button,
  DataPanel,
  LoadingIndicator,
  RemoteData,
  failure,
  loading,
  success,
  notAsked,
} from "../helpers";
import { Container, InnerPanel, Table } from "./Demo2.styles";

interface Film {
  title: string;
  episode_id: number;
  release_date: string;
}

interface Model {
  data: RemoteData<Film[], string>;
}

type Action<T> =
  | { type: "LOADING" }
  | { type: "FAILED"; error: string }
  | { type: "SUCCESS"; data: T };

const reducer = (_state: Model, action: Action<Film[]>): Model => {
  switch (action.type) {
    case "FAILED":
      return { data: failure(action.error) };
    case "LOADING":
      return { data: loading() };
    case "SUCCESS":
      return { data: success(action.data) };
  }
};

export const Demo2 = () => {
  const [model, dispatch] = useReducer(reducer, {
    data: notAsked() as RemoteData<Film[], string>,
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

  const view = (model: Model) => {
    switch (model.data.type) {
      case "NOTASKED":
        return null;
      case "LOADING":
        return <LoadingIndicator className="loading" />;
      case "FAILURE":
        return <div>{model.data.error}</div>;
      case "SUCCESS":
        return (
          !!model.data.data.length && (
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
                  {model.data.data.map((d) => (
                    <tr>
                      <td>{d.title}</td>
                      <td>{d.episode_id}</td>
                      <td>{d.release_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </DataPanel>
          )
        );
    }
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
        {view(model)}
        <div>
          <pre>{JSON.stringify(model, null, 2)}</pre>
        </div>
      </InnerPanel>
    </Container>
  );
};
