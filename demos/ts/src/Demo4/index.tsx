import React, { useReducer } from "react";
import { Carousel, makeCarousel } from "./Carousel";
import { CarouselView } from "./CarouselView";
import {
  Button,
  CenteredDisplay,
  Container,
  DataPanel,
  Link,
  LoadingIndicator,
  TextBox,
  failure,
  loading,
  map,
  notAsked,
  RemoteData,
  success,
  isNotAsked,
} from "../helpers";

interface Photo {
  id: string;
  description: string;
  url: string;
  author: string;
  authorUrl: string;
}

const fetchPhotos = (query: string): Promise<Photo[]> => {
  return fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
  )
    .then((resp) => resp.json())
    .then((res) =>
      res.results.slice(0, 5).map((r: any) => ({
        id: r.id,
        description: r.description,
        url: r.urls.small,
        author: r.user.name,
        authorUrl: r.user.links.html,
      }))
    );
};

interface State {
  searchText: string;
  photos: RemoteData<Carousel<Photo> | null, string>;
}

type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: Photo[] }
  | { type: "FAILURE"; error: string }
  | { type: "ON_SEARCH_TEXT_CHANGED"; text: string }
  | { type: "PHOTOS_UPDATED"; photos: Carousel<Photo> };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, photos: loading() };
    case "SUCCESS":
      if (!action.data.length) {
        return { photos: success(null), searchText: "" };
      }
      return {
        photos: success(makeCarousel(action.data[0], action.data.slice(1))),
        searchText: "",
      };
    case "FAILURE":
      return { ...state, photos: failure(action.error) };
    case "ON_SEARCH_TEXT_CHANGED":
      return { ...state, searchText: action.text };
    case "PHOTOS_UPDATED":
      return { ...state, photos: map((_p) => action.photos, state.photos) };
  }
};

export const Demo4 = () => {
  const [{ searchText, photos }, dispatch] = useReducer(reducer, {
    searchText: "",
    photos: notAsked() as RemoteData<Carousel<Photo>, string>,
  });

  const makeQuery = (searchText: string) => {
    dispatch({ type: "LOADING" });
    fetchPhotos(searchText)
      .then((photos) => {
        dispatch({ type: "SUCCESS", data: photos });
      })
      .catch((err) => {
        dispatch({ type: "FAILURE", error: err.toString() });
      });
  };

  const photosView = ((photos) => {
    switch (photos.type) {
      case "NOTASKED":
        return null;
      case "LOADING":
        return <LoadingIndicator className="loading" />;
      case "SUCCESS":
        if (photos.data == null) {
          return <div>No photos found...</div>;
        }
        return (
          <CarouselView
            carousel={photos.data}
            render={(item: Photo) => (
              <figure style={{ textAlign: "center" }}>
                <img alt={item.description} src={item.url} />
                <figcaption>
                  <Link href={item.authorUrl} target="_blank">
                    {item.author}
                  </Link>
                </figcaption>
              </figure>
            )}
            onChange={(newPhotos: Carousel<Photo>) =>
              dispatch({ type: "PHOTOS_UPDATED", photos: newPhotos })
            }
          />
        );
      case "FAILURE":
        return <div></div>;
    }
  })(photos);

  return (
    <CenteredDisplay>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextBox
          type="text"
          value={searchText}
          placeholder="Search for photos..."
          onChange={(e) =>
            dispatch({ type: "ON_SEARCH_TEXT_CHANGED", text: e.target.value })
          }
        />
        <Button inline onClick={() => makeQuery(searchText)}>
          Search
        </Button>
        {isNotAsked(photos) ? null : <DataPanel>{photosView}</DataPanel>}
      </Container>
    </CenteredDisplay>
  );
};
