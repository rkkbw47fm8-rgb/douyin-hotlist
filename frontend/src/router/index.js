import { createRouter, createWebHistory } from 'vue-router'
import HotListView from '../views/HotListView.vue'
import DetailView from '../views/DetailView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'hotlist', component: HotListView },
  { path: '/detail/:id', name: 'detail', component: DetailView },
  { path: '/profile', name: 'profile', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
