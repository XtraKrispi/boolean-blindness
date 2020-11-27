import React from "react";
import styled from "styled-components";
import { Button } from "./Styles";

export interface Carousel<T> {
  prevElements: T[];
  selectedElement: T;
  nextElements: T[];
}

export function makeCarousel<T>(list: T[]): Carousel<T> | null {
  if (!list.length) {
    return null;
  }

  return {
    prevElements: [],
    selectedElement: list[0],
    nextElements: list.slice(1),
  };
}

export function hasPrev<T>(carousel: Carousel<T>): boolean {
  return !!carousel.prevElements.length;
}

export function hasNext<T>(carousel: Carousel<T>): boolean {
  return !!carousel.nextElements.length;
}

export function currentElement<T>(carousel: Carousel<T>): T {
  return carousel.selectedElement;
}

export function next<T>({
  prevElements,
  selectedElement,
  nextElements,
}: Carousel<T>) {
  if (!nextElements.length) {
    return { prevElements, selectedElement, nextElements };
  }

  return {
    prevElements: prevElements.concat([selectedElement]),
    selectedElement: nextElements[0],
    nextElements: nextElements.slice(1),
  };
}

export function previous<T>({
  prevElements,
  selectedElement,
  nextElements,
}: Carousel<T>) {
  if (!prevElements.length) {
    return { prevElements, selectedElement, nextElements };
  }

  return {
    prevElements: prevElements.slice(0, -1),
    selectedElement: prevElements[prevElements.length - 1],
    nextElements: [selectedElement].concat(nextElements),
  };
}

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
