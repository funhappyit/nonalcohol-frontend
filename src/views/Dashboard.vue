<template>
  <div v-if="accessGranted">
    <h2>사용자 페이지</h2>
    <p>운영자와 사용자가 볼 수 있습니다</p>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'         // Vue 기능 가져오기
import { useRouter } from 'vue-router'       // 라우팅 기능

const router = useRouter()
const accessGranted = ref(false)             // 접근 가능 여부 (기본값은 false)

onMounted(() => {
  const userJson = localStorage.getItem('user') // 로컬스토리지에서 로그인 정보 가져오기
  if (!userJson) {
    denyAccess()                                // 로그인 정보 없으면 접근 거부
    return
  }

  const user = JSON.parse(userJson)
  if (user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_USER') {
    accessGranted.value = true                  // 접근 허용
  } else {
    denyAccess()                                // ROLE이 맞지 않으면 접근 거부
  }
})

function denyAccess() {
  alert('접근 권한이 없습니다.')
  router.replace('/login')                      // 로그인 페이지로 이동
}
</script>
