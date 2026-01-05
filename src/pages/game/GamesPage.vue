<template>
  <div class="flex flex-col w-full min-h-screen bg-gray-50 overflow-clip">
    <NavBar />
    <main
        class="flex-1 bg-[#f2e3d0]"
        :style="{
        backgroundImage: `url(${bgGrid})`,
        backgroundRepeat: 'repeat'
      }"
    >
      <div class="w-full max-w-[1700px] mx-auto flex gap-4 p-6">

        <section class="w-full xl:w-[75%]">
          <GameInfoPanel />
        </section>

        <aside class="hidden xl:block xl:w-[25%]">
          <SideBarPanel />
        </aside>

      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import bgGrid from "@/assets/pngs/bg-grid.png";
import GameInfoPanel from "@/components/game/main/GameInfoPanel.vue";
import SideBarPanel from "@/components/game/main/SideBarPanel.vue";
import Footer from '@/components/Footer.vue'
import NavBar from '@/components/NavBar.vue'
</script>
