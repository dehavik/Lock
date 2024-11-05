<template>
  <div>
    <h1>Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p>Requested URL: {{ $route.fullPath }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFoundView',
}
</script>
