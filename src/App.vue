<template>
  <div class="flex bg-gray-50 min-h-screen">
    <!-- 菜单栏 -->
    <Sidebar
        class="z-999"
        :collapsed="collapsed"
        @toggle="collapsed = !collapsed"
    />

    <!-- 主体 -->
    <main
        class="flex-1 h-screen overflow-y-auto transition-all duration-300 ease-in-out"
        :class="collapsed
        ? 'ml-12 sm:ml-16 lg:ml-14'
        : 'ml-12 sm:ml-16 lg:ml-40'"
    >
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const collapsed = ref(true)
</script>
