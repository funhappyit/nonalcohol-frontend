<template>
  <!-- 네비게이션 바 전체 영역 -->
  <nav class="navbar">
    <!-- 왼쪽 메뉴들 -->
    <div class="nav-left">
      <!-- 누구나 접근 가능 -->
      <router-link to="/dashboard" class="nav-link">대시보드</router-link>

      <!-- 관리자 전용 메뉴 (v-if 조건) -->
<!--      <router-link to="/admin" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">관리자</router-link>-->
      <router-link to="/admin/members" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">회원관리</router-link>
      <router-link to="/admin/event-register" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">벙 생성</router-link>
      <router-link to="/admin/event-view" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">벙 조회</router-link>
      <router-link to="/admin/attendance-stats" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">벙 순위 통계</router-link>

    </div>

    <!-- 오른쪽 사용자 정보 및 버튼 -->
    <div class="nav-right">
      <!-- 로그인한 사용자일 때만 표시 -->
      <span v-if="user" class="username">{{ user.username }} 님</span>

      <!-- 회원정보 페이지로 이동 -->
      <button @click="goToProfile" class="profile-btn">회원정보</button>

      <!-- 로그아웃 처리 -->
      <button @click="logout" class="logout-btn">로그아웃</button>
    </div>
  </nav>
</template>

<script setup>
// Vue Composition API에서 상태 관리용 ref, 생명주기 훅 import
import { ref, onMounted } from 'vue'
// 페이지 이동을 위한 Vue Router 기능 import
import { useRouter } from 'vue-router'

// useRouter()를 통해 라우터 인스턴스 생성
const router = useRouter()

// 로그인한 사용자 정보를 저장하는 반응형 변수
const user = ref(null)

// 컴포넌트가 마운트될 때 로컬스토리지에서 사용자 정보 불러옴
onMounted(() => {
  const stored = localStorage.getItem('user')
  if (stored) {
    user.value = JSON.parse(stored)
  }
})

// 로그아웃 함수: 사용자 정보 제거 + 로그인 페이지로 이동
const logout = () => {
  localStorage.removeItem('user')
  alert('로그아웃 되었습니다.')
  router.push('/login')
}

// 회원정보 페이지로 이동
const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
/* 전체 네비게이션 바 스타일 */
.navbar {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center;
  background-color: #2d8cf0;
  padding: 12px 24px;
  color: white;
}

/* 링크 및 로그아웃 버튼 기본 스타일 */
.nav-left .nav-link,
.nav-right .logout-btn {
  margin-left: 12px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

/* 로그아웃 버튼 스타일 */
.logout-btn {
  background: none;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

/* 로그아웃 버튼 hover 효과 */
.logout-btn:hover {
  background-color: white;
  color: #2d8cf0;
}

/* 사용자 이름 스타일 */
.username {
  margin-right: 12px;
}

/* 회원정보 버튼 스타일 */
.profile-btn {
  background: none;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  color: white;
}

/* 회원정보 버튼 hover 효과 */
.profile-btn:hover {
  background-color: white;
  color: #2d8cf0;
}
</style>
