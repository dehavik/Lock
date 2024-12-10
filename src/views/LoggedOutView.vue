<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">De Havik Kluis</h1>
      <button
        @click="login"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const login = () => {
  // Add your login logic here
  console.log('Login button clicked')
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
