import { moveTo, applyDragStyles, getElementWithSelectorBelow, resetDragStyles } from './native-dom';
import { getElementDraggingEvent, getElementDragLeaveEvent, getElementDroppedEvent } from './native-events.js';

const startDrag = (element, event) => {
  applyDragStyles(element);
  moveTo(element, event.pageX, event.pageY);
};

const endDrag = (element, droppable) => {
  resetDragStyles(element);
  element.dispatchEvent(getElementDroppedEvent());
  leaveDroppable(droppable);
};

const enterDroppable = (el) => {
  el.setAttribute('drop-candidate', 'true');
};

const leaveDroppable = (el) => {
  if (!el) return;

  el.removeAttribute('drop-candidate');
  el.dispatchEvent(getElementDragLeaveEvent());
};

const dragging = ({ moveEvent, element }) => {
  moveTo(element, moveEvent.pageX, moveEvent.pageY);

  const activeDroppable = getElementWithSelectorBelow({
    draggedElement: element,
    clientX: moveEvent.clientX,
    clientY: moveEvent.clientY,
    selector: '[drop-target=true]',
  });

  if (activeDroppable) {
    activeDroppable.dispatchEvent(getElementDraggingEvent(element, moveEvent));
  }

  return activeDroppable;
};

export const registerDraggable = (el) => {
  el.onmousedown = (ev) => {
    let dragStarted = false;
    let previousDroppable = null;

    const handleMouseMove = (mouseMoveEvent) => {
      if (!dragStarted) {
        startDrag(el, ev);
        dragStarted = true;
      }

      const activeDroppable = dragging({
        moveEvent: mouseMoveEvent,
        dragStarted,
        element: el,
      });

      if (previousDroppable !== activeDroppable) {
        if (previousDroppable) {
          leaveDroppable(previousDroppable);
        }

        previousDroppable = activeDroppable;

        if (activeDroppable) {
          enterDroppable(activeDroppable);
        }
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);

      if (!dragStarted) return;
      endDrag(el, previousDroppable);
    };

    document.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
  };

  el.ondragstart = function () {
    return false;
  };
};

export const registerDropTarget = (el) => {
  el.setAttribute('drop-target', 'true');
};


