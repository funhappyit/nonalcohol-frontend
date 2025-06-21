<template>
  <div v-if="accessGranted">
    <h2>사용자 페이지</h2>
    <p>운영자와 사용자가 볼 수 있습니다</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const accessGranted = ref(false)

onMounted(() => {
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    denyAccess()
    return
  }

  const user = JSON.parse(userJson)
  if (user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_USER') {
    accessGranted.value = true
  } else {
    denyAccess()
  }
})

function denyAccess() {
  alert('접근 권한이 없습니다.')
  router.replace('/login')
}
</script>
