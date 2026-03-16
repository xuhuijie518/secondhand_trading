<script setup>
import { RouterLink, RouterView, useRouter  } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
