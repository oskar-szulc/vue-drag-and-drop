import { ObjectDirective } from "vue";
import { registerDraggable, registerDropTarget } from '../services/native-dnd.js'

export const draggable: ObjectDirective = {
  created: (el) => {
    registerDraggable(el);
  },
};

export const dropTarget: ObjectDirective = {
  created: (el) => {
    registerDropTarget(el);
  },
};
