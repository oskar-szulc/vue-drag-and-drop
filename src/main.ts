import { draggable, dropTarget } from './directives/draggable';
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App)
  .directive('draggable', draggable)
  .directive('drop-target', dropTarget)
  .mount('#app')
