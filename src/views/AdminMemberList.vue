<template>
  <!-- 회원 리스트를 담는 전체 컨테이너 -->
  <div class="member-list-container">
    <h2>회원 관리</h2>

    <!-- 회원 등록 버튼: 클릭 시 등록 페이지로 이동 -->
    <button class="register-btn" @click="goToRegister">회원 등록</button>

    <!-- 회원 목록 테이블 -->
    <table>
      <thead>
      <tr>
        <!-- 테이블 헤더 -->
        <th>이름</th>
        <th>아이디</th>
        <th>연락처</th>
        <th>지역</th>
        <th>나이</th>
        <th>역할</th>
        <th>상태</th>
        <th>수정</th>
        <th>삭제</th>
      </tr>
      </thead>
      <tbody>
      <!-- 회원 데이터를 반복 출력 -->
      <tr v-for="m in members" :key="m.id">
        <td>{{ m.name }}</td>
        <td>{{ m.username }}</td>
        <td>{{ m.phone }}</td>
        <td>{{ m.region }}</td>
        <td>{{ m.age }}</td>
        <td>{{ m.role }}</td>
        <td>{{ m.status }}</td>
        <td>
          <!-- 수정 버튼 클릭 시 editMember 실행 -->
          <button @click="editMember(m)">수정</button>
        </td>
        <td>
          <!-- 삭제 버튼 클릭 시 deleteMember 실행 -->
          <button @click="deleteMember(m.id)">삭제</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Vue에서 반응형 데이터 및 생명주기 훅 사용
import { ref, onMounted } from 'vue'
// HTTP 요청을 위해 axios 사용
import axios from 'axios'
// 페이지 이동을 위한 Vue Router 사용
import { useRouter } from 'vue-router'

// 회원 목록을 저장하는 반응형 배열
const members = ref([])

// router 객체 초기화
const router = useRouter()

// 컴포넌트가 처음 마운트될 때 회원 목록 로드
onMounted(loadMembers)

// 회원 목록 불러오는 함수 (GET 요청)
function loadMembers() {
  axios.get('http://localhost:8080/api/admin/members')
      .then(res => members.value = res.data)
      .catch(() => alert('회원 목록 조회 실패'))
}

// 회원 삭제 함수
const deleteMember = (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    axios.delete(`http://localhost:8080/api/admin/members/${id}`)
        .then(() => {
          // 삭제 후 목록에서 해당 회원 제거
          members.value = members.value.filter(m => m.id !== id)
          alert('삭제 완료')
        })
        .catch(() => alert('삭제 실패'))
  }
}

// 수정 버튼 클릭 시 실행되는 함수
const editMember = (member) => {
  // localStorage에 수정 대상 저장
  localStorage.setItem('editMember', JSON.stringify(member))
  // 수정 페이지로 이동
  router.push('/admin/member-edit')
}

// 회원 등록 페이지로 이동
const goToRegister = () => {
  router.push('/admin/member-register')
}
</script>

<style scoped>
/* 전체 테이블 컨테이너 스타일 */
.member-list-container {
  max-width: 1000px;
  margin: 40px auto;
}

/* 회원 등록 버튼 스타일 */
.register-btn {
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.register-btn:hover {
  background-color: #1976d2;
}

/* 테이블 기본 스타일 */
table {
  width: 100%;
  border-collapse: collapse;
}

/* 테이블 셀 스타일 */
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

/* 테이블 헤더 배경 */
th {
  background-color: #f4f4f4;
}
</style>
