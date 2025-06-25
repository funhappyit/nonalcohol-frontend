<template>
  <!-- 수정 폼 전체를 감싸는 컨테이너 -->
  <div class="edit-container">
    <h2>회원 수정</h2>

    <!-- form 제출 시 페이지 새로고침 없이 updateMember 실행 -->
    <form @submit.prevent="updateMember">
      <!-- 이름 -->
      <label>이름:
        <input v-model="form.name" />
      </label>

      <!-- 연락처 -->
      <label>연락처:
        <input v-model="form.phone" />
      </label>

      <!-- 지역 -->
      <label>지역:
        <input v-model="form.region" />
      </label>

      <!-- 나이 -->
      <label>나이:
        <input type="number" v-model.number="form.age" min="0" />
      </label>

      <!-- 활동 상태 -->
      <label>상태:
        <select v-model="form.status">
          <option value="참여">참여</option>
          <option value="비참여">비참여</option>
        </select>
      </label>

      <!-- 역할 선택 -->
      <label>역할:
        <select v-model="form.role">
          <option value="ROLE_MEMBER">일반멤버</option>
          <option value="ROLE_ADMIN">운영자</option>
        </select>
      </label>

      <!-- 수정 버튼 -->
      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>

<script setup>
// Vue에서 ref, onMounted (Composition API 방식)
import { ref, onMounted } from 'vue'
// 페이지 이동용 Vue Router 함수
import { useRouter } from 'vue-router'
// HTTP 요청을 위한 axios
import axios from 'axios'

// 페이지 이동 기능 사용 준비
const router = useRouter()

// 반응형 객체: 수정할 회원 정보 저장
const form = ref({})

// localStorage에서 수정 대상 회원 정보 가져오기
const target = JSON.parse(localStorage.getItem('editMember'))

// 컴포넌트 마운트 시 처리
onMounted(() => {
  if (!target) {
    alert('잘못된 접근') // 대상 없으면 에러
    router.push('/admin') // 관리자 홈으로 이동
  }

  // form에 target 정보를 복사
  form.value = { ...target }
})

// 수정 요청 함수
const updateMember = () => {
  axios.put(`http://localhost:8080/api/members/${form.value.id}`, form.value)
      .then(() => {
        alert('수정 완료') // 성공 알림
        router.push('/admin') // 목록으로 이동
      })
      .catch(() => alert('수정 실패')) // 실패 시 알림
}
</script>

<style scoped>
/* 전체 폼 컨테이너 스타일 */
.edit-container {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* 제목 스타일 */
h2 {
  text-align: center;
  color: #2d8cf0;
  margin-bottom: 20px;
}

/* 폼 스타일 */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 라벨 스타일 */
label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #333;
}

/* 입력창과 셀렉트 공통 스타일 */
input,
select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  margin-top: 5px;
}

/* 버튼 스타일 */
button {
  padding: 12px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* 버튼 hover 시 색상 변경 */
button:hover {
  background-color: #1976d2;
}
</style>
