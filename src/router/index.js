import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MemberRegister from '../components/MemberRegister.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/register', component: MemberRegister }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
