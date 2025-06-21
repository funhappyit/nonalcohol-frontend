<template>
  <div>
    <h2>관리자 페이지</h2>
    <p>운영자만 접근 가능한 영역입니다.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user || user.role !== 'ROLE_ADMIN') {
    alert('운영자만 접근할 수 있습니다.')
    router.push('/dashboard')
  }
})
</script>
