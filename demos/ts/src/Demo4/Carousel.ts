export interface Carousel<T> {
  _prevElements: T[];
  _selectedElement: T;
  _nextElements: T[];
}

export function makeCarousel<T>(first: T, rest: T[]): Carousel<T> {
  return {
    _prevElements: [],
    _selectedElement: first,
    _nextElements: rest,
  };
}

export function hasPrev<T>(carousel: Carousel<T>): boolean {
  return !!carousel._prevElements.length;
}

export function hasNext<T>(carousel: Carousel<T>): boolean {
  return !!carousel._nextElements.length;
}

export function currentElement<T>(carousel: Carousel<T>): T {
  return carousel._selectedElement;
}

export function toList<T>(carousel: Carousel<T>): T[] {
  return [
    ...carousel._prevElements,
    carousel._selectedElement,
    ...carousel._nextElements,
  ];
}

export function next<T>({
  _prevElements: prevElements,
  _selectedElement: selectedElement,
  _nextElements: nextElements,
}: Carousel<T>): Carousel<T> {
  if (!nextElements.length) {
    return {
      _prevElements: prevElements,
      _selectedElement: selectedElement,
      _nextElements: nextElements,
    };
  }

  return {
    _prevElements: prevElements.concat([selectedElement]),
    _selectedElement: nextElements[0],
    _nextElements: nextElements.slice(1),
  };
}

export function previous<T>({
  _prevElements: prevElements,
  _selectedElement: selectedElement,
  _nextElements: nextElements,
}: Carousel<T>): Carousel<T> {
  if (!prevElements.length) {
    return {
      _prevElements: prevElements,
      _selectedElement: selectedElement,
      _nextElements: nextElements,
    };
  }

  return {
    _prevElements: prevElements.slice(0, -1),
    _selectedElement: prevElements[prevElements.length - 1],
    _nextElements: [selectedElement].concat(nextElements),
  };
}
