<template>
  <!-- 회원가입 전체 폼을 감싸는 컨테이너 -->
  <div class="register-container">
    <h2>회원 가입</h2>

    <!-- 폼 제출 시 페이지 리로드 막고 submitForm 함수 실행 -->
    <form @submit.prevent="submitForm" class="register-form">

      <!-- 입력 필드: 이름 -->
      <label>이름:
        <input v-model="form.name" required />
      </label>

      <!-- 입력 필드: 아이디 -->
      <label>아이디:
        <input v-model="form.username" required />
      </label>

      <!-- 입력 필드: 비밀번호 -->
      <label>비밀번호:
        <input type="password" v-model="form.password" required />
      </label>

      <!-- 입력 필드: 연락처 -->
      <label>연락처:
        <input v-model="form.phone" required />
      </label>

      <!-- 입력 필드: 지역 -->
      <label>지역:
        <input v-model="form.region" />
      </label>

      <!-- 입력 필드: 나이 (숫자만) -->
      <label>나이:
        <input type="number" v-model.number="form.age" min="0" />
      </label>

      <!-- 선택 필드: 활동 상태 -->
      <label>활동 상태:
        <select v-model="form.status">
          <option value="참여">참여</option>
          <option value="비참여">비참여</option>
        </select>
      </label>

      <!-- 선택 필드: 역할 -->
      <label>역할:
        <select v-model="form.role">
          <option value="일반멤버">일반멤버</option>
          <option value="운영자">운영자</option>
        </select>
      </label>

      <!-- 제출 버튼 -->
      <button type="submit">가입</button>
    </form>

    <!-- 가입 완료 후 응답이 있을 때만 메시지 표시 -->
    <p v-if="response" class="success-msg">
      가입 완료: {{ response.name }}님 (ID: {{ response.id }})
    </p>
  </div>
</template>

<script setup>
// Vue의 Composition API 기능인 ref를 가져옴
import { ref } from 'vue'
// axios는 HTTP 통신을 위한 라이브러리
import axios from 'axios'

// form 데이터를 담을 반응형 객체
const form = ref({
  name: '',
  username: '',
  password: '',
  phone: '',
  region: '',
  age: 0,
  status: '참여',        // 기본값 설정
  role: '일반멤버',     // 일반 사용자 기본값
})

// 서버로부터 받은 응답 데이터를 저장할 변수
const response = ref(null)

// 폼 제출 처리 함수
const submitForm = async () => {
  // 필수 입력값이 누락되었는지 체크
  if (!form.value.name || !form.value.username || !form.value.password || !form.value.phone) {
    alert('이름, 아이디, 비밀번호, 연락처는 필수 입력 항목입니다.')
    return
  }

  // Vue에서 선택한 역할 값을 Spring Security 형식에 맞게 변환
  const role = form.value.role === '운영자' ? 'ROLE_ADMIN' : 'ROLE_MEMBER'

  try {
    // 서버에 회원 정보 POST 요청
    const res = await axios.post('/api/members', {
      ...form.value, // form 객체 복사
      role: role      // 변환된 역할을 별도로 덮어씀
    })

    // 응답 결과 저장 (화면에 출력되도록)
    response.value = res.data

    alert('회원 가입이 완료되었습니다.')

  } catch (err) {
    // 에러가 있으면 메시지 출력
    alert('에러 발생: ' + (err.response?.data?.message || err.message))
  }
}
</script>

<style scoped>
/* 전체 폼 스타일 */
.register-container {
  max-width: 480px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* 폼 자체 레이아웃 */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 라벨과 입력 스타일 */
.register-form label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
}

/* 입력 필드 및 셀렉트 스타일 */
.register-form input,
.register-form select {
  margin-top: 4px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

/* 버튼 스타일 */
.register-form button {
  margin-top: 16px;
  padding: 10px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

/* 버튼 hover 시 색상 반전 */
.register-form button:hover {
  background-color: #1976d2;
}

/* 가입 완료 메시지 */
.success-msg {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
