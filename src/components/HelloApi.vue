<template>
  <div>
    <h2>Spring API 응답</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('로딩 중...')

onMounted(async () => {
  try {
    const res = await axios.get('/api/hello')  // → 프록시 통해 Spring으로 요청됨
    message.value = res.data
  } catch (err) {
    message.value = '에러: ' + err.message
  }
})
</script>
