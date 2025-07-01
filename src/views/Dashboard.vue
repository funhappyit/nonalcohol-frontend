<template>
  <div v-if="accessGranted" class="dashboard-container">
    <h2>📊 대시보드</h2>

    <div class="chart-grid">
      <div class="chart-box">
        <h3>지역별 맴버 분포도</h3>
        <canvas id="regionChart"></canvas>
      </div>

      <div class="chart-box">
        <h3>월별 벙 참여 순위</h3>
        <canvas id="monthlyRankingChart"></canvas>
      </div>

      <div class="chart-box">
        <h3>주간별 벙 참가 인원</h3>
        <canvas id="weeklyParticipationChart"></canvas>
      </div>

      <div class="chart-box">
        <h3>나이별 맴버 분포도</h3>
        <canvas id="ageChart"></canvas>
      </div>

      <div class="chart-box">
        <h3>월별 벙 전체 참여율 추이</h3>
        <canvas id="monthlyParticipationRateChart"></canvas>
      </div>

      <div class="chart-box full-width">
        <h3>월별 벙 미참가 인원 리스트</h3>
        <ul>
          <li v-for="member in nonParticipants" :key="member.id">
            {{ member.name }} ({{ member.region }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import axios from 'axios'

const router = useRouter()
const accessGranted = ref(false)
const nonParticipants = ref([])

onMounted(() => {
  const userJson = localStorage.getItem('user')
  if (!userJson) return denyAccess()

  const user = JSON.parse(userJson)
  if (user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_USER') {
    accessGranted.value = true
    loadDashboardData()
  } else {
    denyAccess()
  }
})

function denyAccess() {
  alert('접근 권한이 없습니다.')
  router.replace('/login')
}

async function loadDashboardData() {

  const [region, ranking] = await Promise.all([ // ranking도 구조분해에 추가해야 함
    axios.get('/api/dashboard/region'),
    axios.get('/api/dashboard/monthly-ranking')
  ])

  const transformedRegionData = {
    labels: region.data.map(item => item.label),
    values: region.data.map(item => item.count)
  }

  const transformedRankingData = {
    labels: ranking.data.map(item => item.name),
    values: ranking.data.map(item => item.count)
  }


  renderChart('regionChart', '지역별 분포도', transformedRegionData)
  renderChart('monthlyRankingChart', '월별 벙 참여 순위', transformedRankingData)
  // const [region, ranking, weekly, age, rate, non] = await Promise.all([
  //   axios.get('/api/dashboard/region')
  //    axios.get('/api/dashboard/monthly-ranking'),
  //    axios.get('/api/dashboard/weekly-participation'),
  //    axios.get('/api/dashboard/age'),
  //    axios.get('/api/dashboard/participation-rate'),
  //    axios.get('/api/dashboard/non-participants')
  // ])
  // console.log("test: " + JSON.stringify(region.data))
  // renderChart('regionChart', '지역별 분포도', region.data)
  //
  //  renderChart('monthlyRankingChart', '월별 벙 참여 순위', ranking.data)
  //  renderChart('weeklyParticipationChart', '주간별 참가 인원', weekly.data)
  // renderChart('ageChart', '나이별 분포도', age.data)
  //  renderChart('monthlyParticipationRateChart', '월별 참여율 추이', rate.data, 'line')
  //
  // nonParticipants.value = non.data
}

function renderChart(canvasId, label, data, type = 'bar') {
  const ctx = document.getElementById(canvasId)
  if (!ctx) return

  new Chart(ctx, {
    type,
    data: {
      labels: data.labels,
      datasets: [
        {
          label,
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: canvasId === 'regionChart' ? 'y' : 'x', // ✅ regionChart만 가로 막대
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { beginAtZero: true,
          ticks: {
            padding: 10 // ✅ x축 글씨 간격 조절
          } }, // 가로 축 기준
        y: {
          ticks: {
            padding: 12, // ✅ 여백 크게 설정
            font: { size: 12 }, // (선택) 글씨 키움
            autoSkip: false
          },
        },
      },
    },
  })
}

</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

.chart-box {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-box.full-width {
  grid-column: span 2;
}
</style>
