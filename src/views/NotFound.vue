<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Page Not Found</h2>
      <p class="text-gray-700 mb-4">
        The page you are looking for does not exist.
      </p>
      <p class="text-gray-700 mb-8">Requested URL: {{ $route.fullPath }}</p>
      <button
        @click="goHome"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
