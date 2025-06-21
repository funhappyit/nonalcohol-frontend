import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MemberRegister from '../components/MemberRegister.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminPage from '../views/AdminPage.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/register', component: MemberRegister },
    { path: '/dashboard', component: Dashboard },
    { path: '/admin', component: AdminPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// ✅ Step 3. 인증 여부 확인
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        alert('로그인이 필요합니다.');
        return next('/login');
    }

    next();
});

export default router;

