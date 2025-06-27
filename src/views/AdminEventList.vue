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
        <td>{{ e.memberNames?.length || 0 }}</td> <!-- ✅ 수정된 부분 -->
        <td>
          <ul>
            <li v-for="name in e.memberNames" :key="name">{{ name }}</li>
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

const editEvent = (event) => {
  localStorage.setItem('editEvent', JSON.stringify({
    id: event.id,
    title: event.title,
    location: event.location,
    date: event.date,
    memberIds: event.memberIds || [],
    memberNames: event.memberNames || []  // ✅ 여기 변경
  }))
  router.push('/admin/event-edit')
}


</script>

<style scoped>
.event-list-container {
  max-width: 1000px;
  margin: 60px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #2d8cf0;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  text-align: center;
  vertical-align: middle;
}

th {
  background-color: #f9f9f9;
  color: #333;
}

ul {
  padding-left: 16px;
  margin: 0;
  text-align: left;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  opacity: 0.85;
}

button:nth-child(1) {
  background-color: #4caf50;
  color: white;
}

button:nth-child(2) {
  background-color: #f44336;
  color: white;
}

</style>
