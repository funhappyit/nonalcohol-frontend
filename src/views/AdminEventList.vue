<template>
  <div class="event-list-container">
    <h2>벙 리스트</h2>
    <table>
      <thead>
      <tr>
        <th>제목</th>
        <th>장소</th>
        <th>날짜</th>
        <th>참가자 수</th>
        <th>참가자 목록</th>
        <th>수정</th>
        <th>삭제</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="e in events" :key="e.id">
        <td>{{ e.title }}</td>
        <td>{{ e.location }}</td>
        <td>{{ e.date }}</td>
        <td>{{ e.usernames.length }}</td>
        <td>
          <ul>
            <li v-for="username in e.usernames" :key="username">{{ username }}</li>
          </ul>
        </td>
        <td><button @click="editEvent(e)">수정</button></td>
        <td><button @click="deleteEvent(e.id)">삭제</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const events = ref([])
const router = useRouter()

onMounted(() => {
  loadEvents()
})

function loadEvents() {
  axios.get('http://localhost:8080/api/admin/events')
      .then(res => events.value = res.data)
      .catch(() => alert('벙 리스트 조회 실패'))
}

function deleteEvent(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    axios.delete(`http://localhost:8080/api/admin/events/${id}`)
        .then(() => {
          alert('삭제 완료')
          loadEvents()
        })
        .catch(() => alert('삭제 실패'))
  }
}

function editEvent(event) {
  localStorage.setItem('editEvent', JSON.stringify(event))
  router.push('/admin/event-edit')
}
</script>

<style scoped>
/* 전체 테이블 컨테이너 스타일 */
.event-list-container {
  max-width: 800px;
  margin: 50px auto;
}

/* 테이블 기본 스타일 */
table {
  width: 100%;
  border-collapse: collapse;
}

/* 테이블 셀 스타일 */
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

/* 헤더 배경 색상 */
th {
  background-color: #f4f4f4;
}
</style>
