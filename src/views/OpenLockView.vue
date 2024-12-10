<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from 'vue3-msal-plugin'
import { InteractionType } from '@azure/msal-browser'
import Modal from '@/components/ModalView.vue'

const isAuthenticated = useIsAuthenticated()
const { user } = storeToRefs(useUserStore())
const { instance } = useMsal()
const router = useRouter()

if (!isAuthenticated.value) {
  router.push({ path: '/' })
}

const email = ref(user.value?.username || '')
const reason = ref('')

const { result } = useMsalAuthentication(InteractionType.Redirect, {
  scopes: ['https://service.flow.microsoft.com//.default'],
})

let accessToken = ''

watch(result, async newValue => {
  if (newValue?.accessToken) {
    accessToken = newValue.accessToken
  }
})

const showModal = ref(false)
const modalMessage = ref('')

const requestOneTimePincode = () => {
  if (accessToken == '') {
    modalMessage.value = 'Access token is empty'
    showModal.value = true
    return
  }
  fetchData()
}

const logout = () => {
  instance.logoutRedirect()
}

const loading = ref(false)

const closeModal = () => {
  showModal.value = false
  router.push('/')
}

const fetchData = async () => {
  loading.value = true
  let text = ''
  try {
    const response = await fetch(
      'https://prod-49.westeurope.logic.azure.com:443/workflows/2e1954e6f56e438dbb5e1253de7131a4/triggers/manual/paths/invoke?api-version=2016-06-01',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: email.value,
          note: reason.value,
        }),
      },
    )
    const data = await response.text()

    try {
      const code = parseInt(data)
      if (!isNaN(code)) {
        text = `De code is ${code}, je kan deze slechts 1 keer gebruiken. De code is 24u geldig.`
      } else {
        text = data
      }
    } catch {
      text = data
    }
  } catch (error) {
    text = (error as Error).message
  } finally {
    // empty text input
    reason.value = ''
    modalMessage.value = text
    showModal.value = true
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Slot openen</h2>
    <p class="mb-4 text-gray-700">
      Ingelogd als {{ email }}.
      <a @click="logout" class="text-blue-500 hover:underline cursor-pointer"
        >Log uit</a
      >
    </p>
    <form @submit.prevent="requestOneTimePincode">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Emailadres</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed"
          required
          readonly
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="reason"
          >Waarom wil je het slot openen?</label
        >
        <textarea
          id="reason"
          v-model="reason"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Geef de reden waarom je het slot opent"
          required
        ></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button
          :disabled="loading"
          @click="fetchData"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
        >
          <span v-if="loading" class="spinner mr-2"></span>
          <span>{{ loading ? 'Laden...' : 'Vraag code' }}</span>
        </button>
      </div>
    </form>
    <Modal
      v-if="showModal"
      :show="showModal"
      title="One-Time Pincode"
      :message="modalMessage"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.max-w-md {
  max-width: 28rem;
}

.bg-gray-200 {
  background-color: #e2e8f0;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

button.loading {
  background-color: grey;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
