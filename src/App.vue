<template>
  <div class="flex bg-gray-50 min-h-screen">
    <Sidebar />
    <main class="flex-1 ml-12 sm:ml-16 lg:ml-40 overflow-y-auto h-screen transition-all duration-300">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>
