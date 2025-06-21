<template>
  <div class="register-container">
    <h2>회원 가입</h2>
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
      <button type="submit">가입</button>
    </form>

    <p v-if="response" class="success-msg">
      가입 완료: {{ response.name }}님 (ID: {{ response.id }})
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

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

const response = ref(null)

const submitForm = async () => {
  if (!form.value.name || !form.value.username || !form.value.password || !form.value.phone) {
    alert('이름, 아이디, 비밀번호, 연락처는 필수 입력 항목입니다.')
    return
  }

  // 역할을 Spring Security 형식에 맞춰 변환
  const role = form.value.role === '운영자' ? 'ROLE_ADMIN' : 'ROLE_MEMBER'

  try {
    const res = await axios.post('/api/members', {
      ...form.value,
      role: role // 변환된 역할값
    })
    response.value = res.data
    alert('회원 가입이 완료되었습니다.')
  } catch (err) {
    alert('에러 발생: ' + (err.response?.data?.message || err.message))
  }
}

</script>

<style scoped>
.register-container {
  max-width: 480px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
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
  font-size: 14px;
}

.register-form button {
  margin-top: 16px;
  padding: 10px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #1976d2;
}

.success-msg {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
