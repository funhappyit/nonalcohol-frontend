<template>
  <div class="member-list-container">
    <h2>회원 관리</h2>
    <button class="register-btn" @click="goToRegister">회원 등록</button>

    <table>
      <thead>
      <tr>
        <th>이름</th>
        <th>아이디</th>
        <th>연락처</th>
        <th>지역</th>
        <th>나이</th>
        <th>역할</th>
        <th>상태</th>
        <th>수정</th>
        <th>삭제</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="m in members" :key="m.id">
        <td>{{ m.name }}</td>
        <td>{{ m.username }}</td>
        <td>{{ m.phone }}</td>
        <td>{{ m.region }}</td>
        <td>{{ m.age }}</td>
        <td>{{ m.role }}</td>
        <td>{{ m.status }}</td>
        <td><button @click="editMember(m)">수정</button></td>
        <td><button @click="deleteMember(m.id)">삭제</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const members = ref([])
const router = useRouter()

onMounted(loadMembers)

function loadMembers() {
  axios.get('http://localhost:8080/api/admin/members')
      .then(res => members.value = res.data)
      .catch(() => alert('회원 목록 조회 실패'))
}

const deleteMember = (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    axios.delete(`http://localhost:8080/api/admin/members/${id}`)
        .then(() => {
          members.value = members.value.filter(m => m.id !== id)
          alert('삭제 완료')
        })
        .catch(() => alert('삭제 실패'))
  }
}

const editMember = (member) => {
  localStorage.setItem('editMember', JSON.stringify(member))
  router.push('/admin/member-edit')
}

const goToRegister = () => {
  router.push('/admin/member-register')
}
</script>

<style scoped>
.member-list-container {
  max-width: 1000px;
  margin: 40px auto;
}

.register-btn {
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.register-btn:hover {
  background-color: #1976d2;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}
</style>
