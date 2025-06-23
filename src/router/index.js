import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MemberRegister from '../components/MemberRegister.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminPage from '../views/AdminPage.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminMemberList from '../views/AdminMemberList.vue'
import AdminMemberEdit from '../views/AdminMemberEdit.vue'
import AdminMemberRegister from '../views/AdminMemberRegister.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/register', component: MemberRegister },
    { path: '/dashboard', component: Dashboard },
    { path: '/admin', component: AdminPage },
    { path: '/profile', component: ProfileView },
    { path: '/admin/members', component: AdminMemberList },      // 전체 회원 목록
    { path: '/admin/member-edit', component: AdminMemberEdit },  // 회원 수정 화면
    { path: '/admin/member-register', component: AdminMemberRegister }
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

