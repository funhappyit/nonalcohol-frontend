<template>
  <div class="register-container"> <!-- 전체 컨테이너 -->
    <h2>회원 등록</h2>

    <!-- 폼 제출 시 submitForm() 실행, 페이지 새로고침은 방지됨 -->
    <form @submit.prevent="submitForm" class="register-form">

      <!-- 각 입력은 form 객체와 양방향 바인딩 (v-model) -->
      <label>이름: <input v-model="form.name" required /></label>
      <label>아이디: <input v-model="form.username" required /></label>
      <label>비밀번호: <input type="password" v-model="form.password" required /></label>
      <label>연락처: <input v-model="form.phone" required /></label>
      <label>지역: <input v-model="form.region" /></label>
      <label>나이: <input type="number" v-model.number="form.age" min="0" /></label>

      <!-- 셀렉트 박스도 v-model 사용 -->
      <label>활동 상태:
        <select v-model="form.status">
          <option value="참여">참여</option>
          <option value="비참여">비참여</option>
        </select>
      </label>

      <label>역할:
        <select v-model="form.role">
          <option value="일반멤버">일반멤버</option>
          <option value="운영자">운영자</option>
        </select>
      </label>

      <!-- 버튼 클릭 시 submitForm() 실행됨 -->
      <button type="submit">등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'              // 반응형 데이터 선언용
import axios from 'axios'             // HTTP 요청 라이브러리
import { useRouter } from 'vue-router'// 페이지 이동용

// form이라는 반응형 객체 선언: input 값들이 여기에 저장됨
const form = ref({
  name: '',
  username: '',
  password: '',
  phone: '',
  region: '',
  age: 0,
  status: '참여',
  role: '일반멤버',
})

// 페이지 이동용 라우터 객체 가져오기
const router = useRouter()

// 폼 제출 시 실행될 함수 정의
const submitForm = () => {
  // 필수 항목 검증
  if (!form.value.name || !form.value.username || !form.value.password || !form.value.phone) {
    alert('이름, 아이디, 비밀번호, 연락처는 필수 입력입니다.')
    return
  }

  // '운영자'는 ROLE_ADMIN, 나머지는 ROLE_MEMBER로 변환
  const role = form.value.role === '운영자' ? 'ROLE_ADMIN' : 'ROLE_MEMBER'

  // 서버에 POST 요청
  axios.post('http://localhost:8080/api/members', {
    ...form.value,     // 기존 form 값 모두 포함
    role               // 변환된 role만 덮어쓰기
  })
      .then(() => {
        alert('회원 등록 완료')
        router.push('/admin')  // 등록 완료 후 관리자 페이지로 이동
      })
      .catch(() => alert('등록 실패'))  // 실패 시 메시지 출력
}
</script>


<style scoped> /* 이 컴포넌트에만 적용되도록 scoped 설정 */
.register-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fafafa;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.register-form label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
}

.register-form input,
.register-form select {
  margin-top: 4px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.register-form button {
  margin-top: 16px;
  padding: 10px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #1976d2;
}
</style>
