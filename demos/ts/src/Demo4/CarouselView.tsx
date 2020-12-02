import {
  Carousel,
  currentElement,
  hasNext,
  hasPrev,
  next,
  previous,
} from "./Carousel";
import styled from "styled-components";
import React from "react";
import { Button } from "../helpers/Styles";

interface CarouselViewProps<T> {
  carousel: Carousel<T>;
  render: (item: T) => React.ReactElement;
  onChange: (carousel: Carousel<T>) => void;
}

const CarouselContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Chevron = styled.div`
  div {
    cursor: ${({ enabled }: { enabled?: boolean }) =>
      enabled ? "pointer" : "not-allowed"};
  }
`;

export const CarouselView = <T,>({
  carousel,
  render,
  onChange,
}: CarouselViewProps<T>) => {
  return (
    <CarouselContainer>
      <Chevron
        enabled={hasPrev(carousel)}
        onClick={() => onChange(previous(carousel))}
      >
        <Button>{" < "}</Button>
      </Chevron>
      <div>{render(currentElement(carousel))}</div>
      <Chevron
        enabled={hasNext(carousel)}
        onClick={() => onChange(next(carousel))}
      >
        {" "}
        <Button>{" > "}</Button>
      </Chevron>
    </CarouselContainer>
  );
};
