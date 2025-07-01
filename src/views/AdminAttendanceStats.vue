<template>
  <div class="attendance-stats-container">
    <h2>벙 참여 순위</h2>

    <label style="margin-bottom: 20px; display: block;">
      월 선택:
      <select v-model="selectedMonth" @change="fetchStats">
        <option v-for="month in months" :key="month" :value="month">{{ month }}월</option>
      </select>
    </label>

    <table>
      <thead>
      <tr>
        <th>순위</th>
        <th>이름</th>
        <th>아이디</th>
        <th>참여 횟수</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(stat, idx) in sortedStats" :key="stat.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ stat.name }}</td>
        <td>{{ stat.username }}</td>
        <td>{{ stat.count }}</td>
      </tr>
      </tbody>
    </table>

    <h2 style="margin-top: 40px;">미참가자</h2>
    <ul>
      <li v-for="stat in nonParticipants" :key="stat.id">
        {{ stat.name }} ({{ stat.age }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const stats = ref([]) // 참석 통계
const allMembers = ref([]) // 전체 회원
const selectedMonth = ref(new Date().getMonth() + 1)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

async function fetchStats() {
  try {
    const [statsRes, membersRes] = await Promise.all([
      axios.get(`http://localhost:8080/api/admin/attendance/stats?month=${selectedMonth.value}`),
      axios.get('http://localhost:8080/api/admin/members?size=1000')
    ])
    stats.value = statsRes.data
    console.log(stats.value);
    allMembers.value = membersRes.data.content
    console.log(allMembers.value);
  } catch {
    alert('데이터 조회 실패')
  }
}

onMounted(fetchStats)

const participatedIds = computed(() => new Set(stats.value.map(s => Number(s.id))))
const nonParticipants = computed(() =>
    stats.value
        .filter(s => s.count === 0)
        .map(s => ({
          id: s.id,
          name: s.name,
          age: s.age,
          username: s.username || '-',
          count: 0
        }))
)


const sortedStats = computed(() =>
    stats.value.filter(s => s.count > 0).sort((a, b) => b.count - a.count)
)
</script>

<style scoped>
.attendance-stats-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Arial', sans-serif;
}
h2 {
  margin-bottom: 20px;
  color: #2d8cf0;
  border-left: 4px solid #2d8cf0;
  padding-left: 12px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}
th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}
th {
  background-color: #f5f7fa;
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
ul {
  list-style: none;
  padding-left: 0;
}
li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  font-size: 15px;
}
li:last-child {
  border-bottom: none;
}
</style>
