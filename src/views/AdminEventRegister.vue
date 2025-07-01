<template>
  <div class="event-container">
    <h2>벙(모임) 생성</h2>
    <form @submit.prevent="createEvent" class="event-form">
      <label>제목: <input v-model="form.title" required /></label>
      <label>장소: <input v-model="form.location" required /></label>
      <label>날짜: <input type="date" v-model="form.date" required /></label>

      <h3>참가자 선택</h3>
      <input
          v-model="searchKeyword"
          placeholder="이름 검색"
          class="search-input"
      />

      <div class="members-list">
        <label v-for="m in filteredMembers" :key="m.id">
          <input type="checkbox" :value="m.id" v-model="selectedMemberIds" />
          {{ m.name }} ({{ m.age }})
        </label>
      </div>

      <button type="submit">벙 생성</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = ref({ title: '', location: '', date: '' })
const members = ref([])
const selectedMemberIds = ref([])
const router = useRouter()
const searchKeyword = ref('')

onMounted(() => {
  axios.get('http://localhost:8080/api/admin/members?page=0&size=1000') // 충분히 큰 size
      .then(res => members.value = res.data.content) // ✅ content만 추출
      .catch(() => alert('회원 조회 실패'))
})

const createEvent = () => {
  if (!form.value.title || !form.value.location || !form.value.date) {
    alert('제목, 장소, 날짜는 필수입니다.')
    return
  }

  axios.post('http://localhost:8080/api/admin/events/with-members', {
    title: form.value.title,
    location: form.value.location,
    date: form.value.date,
    memberIds: selectedMemberIds.value
  })
      .then(() => {
        alert('벙 생성 완료')
        router.push('/admin')
      })
      .catch(() => alert('벙 생성 실패'))
}

const filteredMembers = computed(() => {
  if (!searchKeyword.value) return members.value
  return members.value.filter(m =>
      m.name.toLowerCase().startsWith(searchKeyword.value.toLowerCase())
  )
})
</script>

<style scoped>
.event-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.event-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.members-list {
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 8px;
}
.search-input {
  margin-bottom: 8px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
