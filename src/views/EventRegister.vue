<template>
  <div class="event-register-container">
    <h2>벙(모임) 생성</h2>
    <form @submit.prevent="submitForm">
      <label>제목: <input v-model="form.title" required /></label>
      <label>장소: <input v-model="form.location" required /></label>
      <label>날짜: <input type="date" v-model="form.date" required /></label>
      <button type="submit">등록</button>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// 벙 정보를 담는 반응형 객체
const form = ref({
  title: '',
  location: '',
  date: ''
})

const router = useRouter() // 페이지 이동용 라우터 객체

// 벙 등록 함수
const submitForm = async () => {
  try {
    await axios.post('http://localhost:8080/api/admin/events', form.value)
    alert('벙 생성 완료')
    router.push('/admin/event-list') // 등록 후 목록 페이지로 이동
  } catch (err) {
    alert('에러 발생: ' + (err.response?.data?.message || err.message))
  }
}
</script>


<style scoped>
.event-register-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>
