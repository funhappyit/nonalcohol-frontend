<template>
  <div class="register-container">
    <h2>회원 등록</h2>

    <form @submit.prevent="submitForm" class="register-form">

      <!-- 이름 -->
      <label>이름:
        <input v-model="form.name" required />
      </label>

      <!-- 나이 -->
      <label>나이:
        <input type="number" v-model.number="form.age" min="0" />
      </label>

      <!-- 지역 -->
      <label>지역:
        <input v-model="form.region" />
      </label>

      <!-- 등록 버튼 -->
      <button type="submit">등록</button>
    </form>

    <p v-if="response" class="success-msg">
      등록 완료: {{ response.name }}님 (ID: {{ response.id }})
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 최소 정보만 포함한 form
const form = ref({
  name: '',
  age: 0,
  region: ''
})

const response = ref(null)

const submitForm = async () => {
  if (!form.value.name) {
    alert('이름은 필수 입력 항목입니다.')
    return
  }

  try {
    const res = await axios.post('/api/members/simple', form.value) // 서버에서 별도의 엔드포인트 필요할 수 있음
    response.value = res.data
    alert('회원 등록이 완료되었습니다.')
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
.register-form input {
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
