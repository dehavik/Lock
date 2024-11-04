import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user-info'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>(null)
  function updateUser(userInfo: UserInfo) {
    user.value = userInfo
  }

  return { user, updateUser }
})
