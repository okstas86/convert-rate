import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import ConversionPage from './pages/ConversionPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/convert',
    name: 'Convert',
    component: ConversionPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
