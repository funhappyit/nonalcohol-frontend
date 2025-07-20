<template>
  <div class="register-container">
    <h2>회원 등록</h2>

    <form @submit.prevent="submitForm" class="register-form">
      <label>이름:
        <input v-model="form.name" required />
      </label>

      <label>년생:
        <input type="number" v-model.number="form.age" min="00" required />
      </label>

      <label>지역:
        <input v-model="form.region" />
      </label>

      <label>신입 여부:
        <select v-model="form.isNewcomer">
          <option :value="true">신입</option>
          <option :value="false">일반</option>
        </select>
      </label>

      <label>입장일:
        <input type="date" v-model="form.joinedDate" />
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
  age: 0,
  region: '',
  isNewcomer: true,
  joinedDate: ''  // yyyy-MM-dd 형식
})

const router = useRouter()

const submitForm = () => {
  if (!form.value.name) {
    alert('이름과 입장일은 필수 입력 항목입니다.')
    return
  }

  axios.post('http://localhost:8080/api/members/simple', form.value)
      .then(() => {
        alert('회원 등록 완료')
        router.push('/admin/members')
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
