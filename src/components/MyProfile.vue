<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

import { useMsal, useMsalAuthentication } from 'vue3-msal-plugin'
import { InteractionType } from '@azure/msal-browser'
import type { UserInfo } from '@/types/user-info'

const { callMsGraph } = useMsal()
const { result } = useMsalAuthentication(InteractionType.Redirect, {
  scopes: ['https://service.flow.microsoft.com//.default'],
})

const msGraphData: Ref<UserInfo | null> = ref(null)

watch(result, async newValue => {
  if (newValue?.accessToken) {
    try {
      const response = await callMsGraph(newValue?.accessToken)
      msGraphData.value = response
    } catch (error) {
      console.error(error)
    }

    try {
      const response = await fetch(
        'https://prod-188.westeurope.logic.azure.com:443/workflows/807fffce2394427dba55cae3313799d1/triggers/manual/paths/invoke?api-version=2016-06-01',
        {
          headers: {
            Authorization: `Bearer ${newValue?.accessToken}`,
          },
        },
      )
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
})
</script>
<template>
  <div v-if="msGraphData">
    <h1 class="font-bold text-2xl py-4">My Profile</h1>
    <p>
      <span class="font-bold">Display Name: </span>{{ msGraphData.displayName }}
    </p>
    <p>
      <span class="font-bold">Mobile Phone: </span>{{ msGraphData.mobilePhone }}
    </p>
    <p><span class="font-bold">Job Title: </span>{{ msGraphData.jobTitle }}</p>
    <p><span class="font-bold">Mail: </span>{{ msGraphData.mail }}</p>
  </div>
  <div v-else>
    <p>loading...</p>
  </div>
</template>
