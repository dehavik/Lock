<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-md max-w-sm w-full">
      <h3 class="text-xl font-bold mb-4">{{ props.title }}</h3>
      <p class="mb-4">{{ props.message }}</p>
      <button
        @click="close"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
