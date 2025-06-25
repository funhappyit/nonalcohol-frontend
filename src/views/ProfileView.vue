<template>
  <div class="profile-container">
    <h2>회원정보 수정</h2>
    <form @submit.prevent="updateProfile">
      <label>이름: <input v-model="form.name" /></label>
      <label>연락처: <input v-model="form.phone" /></label>
      <label>지역: <input v-model="form.region" /></label>
      <label>나이: <input type="number" v-model.number="form.age" min="0" /></label>
      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// form은 빈 상태로 초기화
const form = ref({ name: '', phone: '', region: '', age: 0 })

// 로그인한 사용자 정보는 localStorage에서 불러옴
const user = JSON.parse(localStorage.getItem('user'))

// 컴포넌트가 로드되었을 때 실행
onMounted(() => {
  if (!user) {
    alert('로그인 필요')
    router.push('/login')
    return
  }

  // 서버에서 사용자 정보 조회
  axios.get(`http://localhost:8080/api/members/${user.id}`)
      .then(res => {
        form.value = res.data
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          alert('회원이 존재하지 않습니다')
        } else {
          alert('회원정보 조회 실패')
        }
      })
})

// 수정 버튼 클릭 시 실행
const updateProfile = () => {
  axios.put(`http://localhost:8080/api/members/${user.id}`, form.value)
      .then(() => {
        alert('수정 완료')
        router.push('/dashboard') // 수정 후 대시보드로 이동
      })
      .catch(() => {
        alert('수정 실패')
      })
}
</script>


<style scoped>
.profile-container {
  max-width: 480px;
  margin: 80px auto;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 15px;
}

input:focus {
  outline: none;
  border-color: #2d8cf0;
  box-shadow: 0 0 4px rgba(45, 140, 240, 0.4);
}

button {
  padding: 12px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #1976d2;
}
</style>