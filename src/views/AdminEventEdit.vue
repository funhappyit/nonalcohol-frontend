<template>
  <div class="event-edit-container">
    <h2>벙 수정</h2>
    <form @submit.prevent="submitEdit">
      <label>제목: <input v-model="form.title" required /></label>
      <label>장소: <input v-model="form.location" required /></label>
      <label>날짜: <input type="date" v-model="form.date" required /></label>

      <label>참여자 선택:</label>
      <div>
        <label
            v-for="m in members"
            :key="m.id"
            style="display:block;"
        >
          <input
              type="checkbox"
              :value="m.id"
              v-model="selectedIds"
          />
          {{ m.name }} ({{ m.username }})
        </label>
      </div>

      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>
<style scoped>
.event-edit-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 28px;
  color: #2d8cf0;
  font-size: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

input[type="text"],
input[type="date"] {
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.2s;
}

input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #2d8cf0;
  outline: none;
}

div > label {
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-bottom: 6px;
  font-size: 14px;
}

input[type="checkbox"] {
  margin-right: 8px;
  transform: scale(1.2);
  cursor: pointer;
}

button {
  padding: 12px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1976d2;
}
</style>



<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const form = ref({
  id: null,
  title: '',
  location: '',
  date: '',
  memberIds: []
})

const members = ref([])             // 전체 멤버 목록
const selectedIds = ref([])         // 선택된 멤버 ID 배열

onMounted(async () => {
  const saved = JSON.parse(localStorage.getItem('editEvent'))

  if (!saved) {
    alert('잘못된 접근')
    router.push('/admin/event-view')
    return
  }

  // 기존 이벤트 데이터 세팅
  form.value = { ...saved }

  // 🔑 체크박스와 일치하도록 숫자 ID 배열 보장
  selectedIds.value = (saved.memberIds || []).map(id => parseInt(id))

  try {
    const res = await axios.get('http://localhost:8080/api/admin/members')
    members.value = res.data
  } catch {
    alert('멤버 목록 조회 실패')
  }
})

function submitEdit() {
  console.log('제출할 벙 ID:', form.value.id) // ✅ 추가
  console.log('참여자 ID 목록:', selectedIds.value)

  axios.put(`http://localhost:8080/api/admin/events/${form.value.id}`, {
    ...form.value,
    memberIds: selectedIds.value
  })
      .then(() => {
        alert('벙 수정 완료')
        router.push('/admin/event-view')
      })
      .catch(() => alert('수정 실패'))
}

</script>
