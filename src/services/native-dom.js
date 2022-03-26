const toPx = (value) => `${value}px`;

export const getElementWithSelectorBelow = ({ draggedElement, clientX, clientY, selector }) => {
  draggedElement.style.visibility = 'hidden';
  const elementBelow = document.elementFromPoint(clientX, clientY);
  draggedElement.style.visibility = 'visible';

  if(!elementBelow) return null;

  return elementBelow.closest(selector);
}

export const moveTo = (el, pageX, pageY) => {
  const { width, height } = el.getBoundingClientRect();

  el.style.left = toPx(pageX - (width / 2));
  el.style.top = toPx(pageY - (height / 2));
};

export const applyDragStyles = (element) => {
  const { width } = element.getBoundingClientRect();
  element.style.position = 'absolute';
  element.style.zindex = 1000;
  element.style.width = toPx(width);
};

export const resetDragStyles = (element) => {
  element.style.left = null;
  element.style.top = null;
  element.style.width = null;
  element.style.position = null;
};
