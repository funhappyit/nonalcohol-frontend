<!-- src/views/LoginView.vue -->
<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="username" placeholder="아이디" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>

<!--    <hr />-->

<!--    <button class="register-btn" @click="goToRegister">회원 가입</button>-->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 반응형 상태 정의
const username = ref('')
const password = ref('')
const router = useRouter()

// 로그인 요청 함수
const login = async () => {
  try {
    const res = await axios.post('http://localhost:8080/api/members/login', {
      username: username.value,
      password: password.value
    })

    const user = res.data
    localStorage.setItem('user', JSON.stringify(user)) // 로그인 정보 저장

    // 역할에 따라 페이지 이동
    if (user.role === 'ROLE_ADMIN') {
      router.push('/dashboard')
    } else {
      router.push('/dashboard')
    }
  } catch (err) {
    alert(err.response?.data?.message || '로그인 실패')
  }
}

// 회원가입 페이지 이동 함수
const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-container { /* 로그인 박스 */
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: 'Arial', sans-serif;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.login-form button {
  padding: 10px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.login-form button:hover {
  background-color: #1976d2;
}

.register-btn {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #388e3c;
}

hr {
  margin: 20px 0;
}
</style>

