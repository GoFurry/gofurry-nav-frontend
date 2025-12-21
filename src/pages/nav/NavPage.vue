<template>
  <div class="flex flex-col w-full min-h-screen bg-gray-50">
    <NavHeader />
    <NavBar />
    <main
        class="flex-1 bg-[#f2e3d0]"
        :style="{
        backgroundImage: `url(${bgGrid})`,
        backgroundRepeat: 'repeat'
      }"
    >
      <NavContent />
    </main>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import NavHeader from '@/components/nav/NavHeader.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import NavContent from '@/components/nav/NavContent.vue'

import bgGrid from '@/assets/pngs/bg-grid.png'
</script>
