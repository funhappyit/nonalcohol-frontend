<template>
  <div class="member-list-container">
    <h2>회원 관리</h2>

    <div class="top-bar">
      <button class="register-btn" @click="goToRegister">회원 등록</button>
      <div class="search-box">
        <input
            v-model="searchKeyword"
            @keyup.enter="search"
            placeholder="이름 또는 지역 검색"
        />
        <button @click="search">검색</button>
        <button @click="resetSearch">초기화</button>
      </div>
      <span class="member-count">총 회원 수: {{ totalCount }}명</span>
    </div>

    <table>
      <thead>
      <tr>
        <th>이름</th>
        <th>지역</th>
        <th>나이</th>
        <th>역할</th>
        <th>신입 여부</th>
        <th>입장일</th>
        <th>벙 마감일</th>
        <th>수정</th>
        <th>삭제</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="m in members" :key="m.id">
        <td>{{ m.name }}</td>
        <td>{{ m.region }}</td>
        <td>{{ m.age }}</td>
        <td>{{ m.role === 'ROLE_ADMIN' ? '운영자' : '일반멤버' }}</td>
        <td>{{ m.isNewcomer ? '신입' : '일반' }}</td>
        <td>{{ m.joinedDate }}</td>
        <td :class="{ overdue: isOverdue(m.attendanceDeadline) }">{{ m.attendanceDeadline }}</td>
        <td><button @click="editMember(m)">수정</button></td>
        <td><button @click="deleteMember(m.id)">삭제</button></td>
      </tr>
      </tbody>
    </table>

    <!-- 페이징 영역 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const members = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = 10
const totalPages = ref(1)

const router = useRouter()

onMounted(() => loadMembers(currentPage.value))

const searchKeyword = ref('')

function loadMembers(page) {
  const keywordParam = searchKeyword.value ? `&keyword=${encodeURIComponent(searchKeyword.value)}` : ''
  axios
      .get(`http://localhost:8080/api/admin/members?page=${page - 1}&size=${pageSize}${keywordParam}`)
      .then(res => {
        members.value = res.data.content
        console.log(members.value);
        totalCount.value = res.data.totalElements
        totalPages.value = res.data.totalPages
      })
      .catch(() => alert('회원 목록 조회 실패'))
}

function search() {
  currentPage.value = 1
  loadMembers(1)
}

function resetSearch() {
  searchKeyword.value = ''
  loadMembers(1)
}


const deleteMember = (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    axios.delete(`http://localhost:8080/api/admin/members/${id}`)
        .then(() => {
          alert('삭제 완료')
          loadMembers(currentPage.value) // 현재 페이지 다시 로딩
        })
        .catch(() => alert('삭제 실패'))
  }
}

const editMember = (member) => {
  localStorage.setItem('editMember', JSON.stringify(member))
  router.push('/admin/member-edit')
}

const goToRegister = () => {
  router.push('/admin/member-register')
}

const isOverdue = (dateStr) => {
  if (!dateStr) return false
  const today = new Date().toISOString().split('T')[0]
  return dateStr < today
}

// 페이지 변경 관련 함수
const changePage = (page) => {
  currentPage.value = page
  loadMembers(page)
}

const prevPage = () => {
  if (currentPage.value > 1) changePage(currentPage.value - 1)
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) changePage(currentPage.value + 1)
}
</script>

<style scoped>
.member-list-container {
  max-width: 1000px;
  margin: 40px auto;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.register-btn {
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

.member-count {
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

.overdue {
  color: red;
  font-weight: bold;
}

/* 페이징 버튼 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 6px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background-color: #2d8cf0;
  color: white;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: default;
}

.search-box {
  display: flex;
  gap: 6px;
  align-items: center;
}
.search-box input {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-box button {
  padding: 6px 10px;
  border: none;
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
}
.search-box button:hover {
  background-color: #ddd;
}
</style>
