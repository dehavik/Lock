<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useIsAuthenticated, useMsal } from 'vue3-msal-plugin'
const isAuthenticated = useIsAuthenticated()
const { user } = storeToRefs(useUserStore())
const { instance, accounts, inProgress, loginRequest } = useMsal()

const router = useRouter()
const login = () => {
  loginRedirect()
}

const logout = () => {
  logoutRedirect()
}

console.log(instance)
console.log(accounts)
console.log(inProgress)

const loginRedirect = () => {
  instance.loginRedirect(loginRequest)
}

const logoutRedirect = () => {
  instance.logoutRedirect()
}

const openLock = () => {
  // router go to "open lock" page

  router.push({ path: '/open' })
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <div v-if="isAuthenticated">
        <h1 class="text-4xl font-bold mb-8">
          Welkom
          {{
            user?.username
              ?.replace('@dehavik.be', '')
              .replace('.', ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          }}!
        </h1>
        <div class="flex justify-center space-x-4">
          <button
            @click="openLock"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Open slot
          </button>
          <button
            @click="logout"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Uitloggen
          </button>
        </div>
      </div>
      <div v-else>
        <h1 class="text-4xl font-bold mb-8">Welkom!</h1>
        <button
          @click="login"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login met je Havik-account
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;

  .min-h-screen {
    min-height: 100vh;
  }
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>
