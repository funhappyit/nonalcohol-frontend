<template>
  <div class="edit-container">
    <h2>회원 수정</h2>
    <form @submit.prevent="updateMember">
      <label>이름: <input v-model="form.name" /></label>
      <label>연락처: <input v-model="form.phone" /></label>
      <label>지역: <input v-model="form.region" /></label>
      <label>나이: <input type="number" v-model.number="form.age" min="0" /></label>
      <label>상태:
        <select v-model="form.status">
          <option value="참여">참여</option>
          <option value="비참여">비참여</option>
        </select>
      </label>
      <label>역할:
        <select v-model="form.role">
          <option value="ROLE_MEMBER">일반멤버</option>
          <option value="ROLE_ADMIN">운영자</option>
        </select>
      </label>
      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const form = ref({})
const target = JSON.parse(localStorage.getItem('editMember'))

onMounted(() => {
  if (!target) {
    alert('잘못된 접근')
    router.push('/admin')
  }
  form.value = { ...target }
})

const updateMember = () => {
  axios.put(`http://localhost:8080/api/members/${form.value.id}`, form.value)
      .then(() => {
        alert('수정 완료')
        router.push('/admin')
      })
      .catch(() => alert('수정 실패'))
}
</script>

<style scoped>
.edit-container {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #2d8cf0;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #333;
}

input,
select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  margin-top: 5px;
}

button {
  padding: 12px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1976d2;
}

</style>
