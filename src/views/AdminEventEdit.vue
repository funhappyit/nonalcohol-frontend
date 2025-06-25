<template>
  <div class="event-edit-container">
    <h2>벙 수정</h2>
    <form @submit.prevent="submitEdit">
      <label>제목: <input v-model="form.title" required /></label>
      <label>장소: <input v-model="form.location" required /></label>
      <label>날짜: <input type="date" v-model="form.date" required /></label>
      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const form = ref({ title: '', location: '', date: '', id: null })

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('editEvent'))
  if (!saved) {
    alert('잘못된 접근')
    router.push('/admin/event-view')
    return
  }
  form.value = saved
})

function submitEdit() {
  axios.put(`http://localhost:8080/api/admin/events/${form.value.id}`, form.value)
      .then(() => {
        alert('수정 완료')
        router.push('/admin/event-view')
      })
      .catch(() => alert('수정 실패'))
}
</script>
