<script setup lang="ts">
import { ref } from 'vue'
import type { Payment } from '../types/payment'

const apiKey = ref('')
const payments = ref<Payment[] | null>(null)
const loading = ref(false)
const error = ref('')

const fetchPayments = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(
      'https://2cb5e8fe-0e22-48fa-bf72-cb40d68c1b81.api.stamhoofd.app/v191/organization/payments',
      {
        headers: {
          Authorization: `Bearer ${apiKey.value}`,
        },
      },
    )
    if (!response.ok) {
      throw new Error('Failed to fetch payments')
    }
    const data: Payment[] = await response.json()
    payments.value = data
  } catch (err) {
    error.value = 'Failed to fetch payments, error: ' + (err as Error).message
  } finally {
    loading.value = false
  }
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
  fetchPayments()
}
</script>

<template>
  <form @submit="handleSubmit">
    <input
      type="password"
      v-model="apiKey"
      placeholder="Enter API Key"
      class="border p-2"
    />
    <button type="submit" class="bg-blue-500 text-white p-2 ml-2">
      Submit
    </button>
  </form>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="payments">
    <h1 class="font-bold text-2xl py-4">Payments</h1>
    <ul>
      <li v-for="payment in payments" :key="payment.id">
        <p>
          <span class="font-bold">Description: </span
          >{{ payment.transferDescription }}
        </p>
        <p><span class="font-bold">Price: </span>{{ payment.price }}</p>
        <p><span class="font-bold">Status: </span>{{ payment.status }}</p>
      </li>
    </ul>
  </div>
</template>
