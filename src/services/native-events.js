export const getElementDraggingEvent = (draggedElement, moveEvent) => new CustomEvent('onelementdragging', {
  detail: {
    draggedElement,
    moveEvent,
  },
});

export const getElementDragLeaveEvent = () => new Event('onelementdragleave');
export const getElementDroppedEvent = () => new Event('onelementdropped');
