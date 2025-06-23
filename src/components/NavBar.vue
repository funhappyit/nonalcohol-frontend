<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/dashboard" class="nav-link">대시보드</router-link>
      <router-link to="/admin" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">관리자</router-link>
      <router-link to="/admin/members" class="nav-link" v-if="user?.role === 'ROLE_ADMIN'">회원관리</router-link>
    </div>
    <div class="nav-right">
      <span v-if="user" class="username">{{ user.username }} 님</span>
      <button @click="goToProfile" class="profile-btn">회원정보</button>
      <button @click="logout" class="logout-btn">로그아웃</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  const stored = localStorage.getItem('user')
  if (stored) {
    user.value = JSON.parse(stored)
  }
})

const logout = () => {
  localStorage.removeItem('user')
  alert('로그아웃 되었습니다.')
  router.push('/login')
}
const goToProfile = () => {
  router.push('/profile')
}
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d8cf0;
  padding: 12px 24px;
  color: white;
}

.nav-left .nav-link,
.nav-right .logout-btn {
  margin-left: 12px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.logout-btn {
  background: none;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: white;
  color: #2d8cf0;
}

.username {
  margin-right: 12px;
}

.profile-btn {
  background: none;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  color: white;
}

.profile-btn:hover {
  background-color: white;
  color: #2d8cf0;
}
</style>
