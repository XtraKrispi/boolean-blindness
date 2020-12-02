interface ICarousel<T> {
  prevElements: T[];
  selectedElement: T;
  nextElements: T[];
}

export type Carousel<T> = { type: "CAROUSEL"; carousel: ICarousel<T> };

export function makeCarousel<T>(first: T, rest: T[]): Carousel<T> {
  return {
    type: "CAROUSEL",
    carousel: {
      prevElements: [],
      selectedElement: first,
      nextElements: rest,
    },
  };
}

export function hasPrev<T>(carousel: Carousel<T>): boolean {
  return !!carousel.carousel.prevElements.length;
}

export function hasNext<T>(carousel: Carousel<T>): boolean {
  return !!carousel.carousel.nextElements.length;
}

export function currentElement<T>(carousel: Carousel<T>): T {
  return carousel.carousel.selectedElement;
}

export function toList<T>(carousel: Carousel<T>): T[] {
  return [
    ...carousel.carousel.prevElements,
    carousel.carousel.selectedElement,
    ...carousel.carousel.nextElements,
  ];
}

export function next<T>({
  carousel: { prevElements, selectedElement, nextElements },
}: Carousel<T>): Carousel<T> {
  if (!nextElements.length) {
    return {
      type: "CAROUSEL",
      carousel: { prevElements, selectedElement, nextElements },
    };
  }

  return {
    type: "CAROUSEL",
    carousel: {
      prevElements: prevElements.concat([selectedElement]),
      selectedElement: nextElements[0],
      nextElements: nextElements.slice(1),
    },
  };
}

export function previous<T>({
  carousel: { prevElements, selectedElement, nextElements },
}: Carousel<T>): Carousel<T> {
  if (!prevElements.length) {
    return {
      type: "CAROUSEL",
      carousel: { prevElements, selectedElement, nextElements },
    };
  }

  return {
    type: "CAROUSEL",
    carousel: {
      prevElements: prevElements.slice(0, -1),
      selectedElement: prevElements[prevElements.length - 1],
      nextElements: [selectedElement].concat(nextElements),
    },
  };
}
