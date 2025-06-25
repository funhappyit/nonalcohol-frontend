// Vue Router 생성 관련 함수 import
import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트 import (각각의 화면에 해당)
import LoginView from '../views/LoginView.vue'
import MemberRegister from '../components/MemberRegister.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminPage from '../views/AdminPage.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminMemberList from '../views/AdminMemberList.vue'
import AdminMemberEdit from '../views/AdminMemberEdit.vue'
import AdminMemberRegister from '../views/AdminMemberRegister.vue'
import AdminEventRegister from '../views/AdminEventRegister.vue'
import EventRegister from '../views/EventRegister.vue'
import AdminEventList from '../views/AdminEventList.vue'
import AdminEventEdit from '../views/AdminEventEdit.vue'

// 각 경로(path)에 해당하는 컴포넌트를 연결하는 라우트 설정 배열
const routes = [
    { path: '/', redirect: '/login' }, // 기본 경로 접속 시 로그인으로 리다이렉트
    { path: '/login', component: LoginView }, // 로그인 페이지
    { path: '/register', component: MemberRegister }, // 회원가입 페이지
    { path: '/dashboard', component: Dashboard }, // 대시보드
    { path: '/admin', component: AdminPage }, // 관리자 홈
    { path: '/profile', component: ProfileView }, // 내 정보 페이지

    // 관리자 기능
    { path: '/admin/members', component: AdminMemberList }, // 회원 목록
    { path: '/admin/member-edit', component: AdminMemberEdit }, // 회원 수정
    { path: '/admin/member-register', component: AdminMemberRegister }, // 회원 등록

    { path: '/admin/event-register', component: AdminEventRegister }, // 벙 생성
    { path: '/admin/event-view', component: AdminEventList }, // 벙 조회 리스트

    { path: '/admin/event-edit', component: AdminEventEdit }
]

// Vue Router 인스턴스 생성 (히스토리 모드 사용)
const router = createRouter({
    history: createWebHistory(), // URL에 # 없이 동작하게 하는 모드
    routes // 위에서 정의한 라우트 배열 전달
})


// ✅ Step 3. 인증 여부 확인 (Navigation Guard)
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register']; // 로그인 없이 접근 가능한 페이지
    const authRequired = !publicPages.includes(to.path); // 인증이 필요한 페이지인지 여부
    const loggedIn = localStorage.getItem('user'); // localStorage에 사용자 정보가 있는지 확인

    if (authRequired && !loggedIn) {
        alert('로그인이 필요합니다.');
        return next('/login'); // 로그인 안 한 상태에서 보호된 페이지 접근 → 로그인으로 이동
    }

    next(); // 문제 없으면 원래 가려던 페이지로 이동
});

export default router; // 라우터 인스턴스 export → main.js에서 사용
