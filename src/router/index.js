import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddTask from '@/views/AddTask.vue';
import TaskList from '@/views/TaskList.vue'; 
import CombinedView from '@/views/CombinedView.vue';// Importa el componente TaskList


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addtask',
    name: 'AddTask', // Ruta para añadir tareas
    component: AddTask // Aquí se carga el componente AddTask
  },
  {
    path: '/tasks',
    name: 'TaskList', // Ruta para mostrar la lista de tareas
    component: TaskList // Aquí se carga el componente TaskList
  },
  {
    path: '/combinado',
    name: 'CombinedView', // Ruta para mostrar la lista de tareas
    component: CombinedView // Aquí se carga el componente TaskList
  },
  // Agrega otras rutas adicionales aquí si las necesitas
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
