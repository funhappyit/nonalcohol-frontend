<template>
  <div>
    <h2>관리자 페이지</h2>
    <p>운영자만 접근 가능한 영역입니다.</p>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'       // 컴포넌트가 마운트되었을 때 실행하는 훅
import { useRouter } from 'vue-router' // 페이지 이동을 위한 라우터

const router = useRouter() // 라우터 객체 가져오기

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user')) // 로컬스토리지에서 로그인 사용자 정보 가져오기

  // 로그인되지 않았거나 ROLE_ADMIN이 아닌 경우
  if (!user || user.role !== 'ROLE_ADMIN') {
    alert('운영자만 접근할 수 있습니다.') // 알림 표시
    router.push('/dashboard')            // 일반 사용자용 대시보드로 강제 이동
  }
})
</script>
