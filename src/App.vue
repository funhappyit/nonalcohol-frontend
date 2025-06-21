<!-- src/App.vue -->
<template>
  <div id="app">
    <NavBar v-if="!hideNavBar" />
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'

const route = useRoute()

// 숨길 경로 목록
const hiddenRoutes = ['/login', '/register']

// 현재 경로가 숨겨야 할 경로에 포함되는지 확인
const hideNavBar = computed(() => hiddenRoutes.includes(route.path))
</script>
