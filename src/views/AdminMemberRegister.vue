<template>
  <div class="register-container">
    <h2>회원 등록</h2>
    <form @submit.prevent="submitForm" class="register-form">
      <label>이름: <input v-model="form.name" required /></label>
      <label>아이디: <input v-model="form.username" required /></label>
      <label>비밀번호: <input type="password" v-model="form.password" required /></label>
      <label>연락처: <input v-model="form.phone" required /></label>
      <label>지역: <input v-model="form.region" /></label>
      <label>나이: <input type="number" v-model.number="form.age" min="0" /></label>
      <label>활동 상태:
        <select v-model="form.status">
          <option value="참여">참여</option>
          <option value="비참여">비참여</option>
        </select>
      </label>
      <label>역할:
        <select v-model="form.role">
          <option value="일반멤버">일반멤버</option>
          <option value="운영자">운영자</option>
        </select>
      </label>
      <button type="submit">등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = ref({
  name: '',
  username: '',
  password: '',
  phone: '',
  region: '',
  age: 0,
  status: '참여',
  role: '일반멤버',
})

const router = useRouter()

const submitForm = () => {
  if (!form.value.name || !form.value.username || !form.value.password || !form.value.phone) {
    alert('이름, 아이디, 비밀번호, 연락처는 필수 입력입니다.')
    return
  }

  const role = form.value.role === '운영자' ? 'ROLE_ADMIN' : 'ROLE_MEMBER'

  axios.post('http://localhost:8080/api/members', { ...form.value, role })
      .then(() => {
        alert('회원 등록 완료')
        router.push('/admin')
      })
      .catch(() => alert('등록 실패'))
}
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fafafa;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.register-form label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
}

.register-form input,
.register-form select {
  margin-top: 4px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.register-form button {
  margin-top: 16px;
  padding: 10px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #1976d2;
}
</style>
