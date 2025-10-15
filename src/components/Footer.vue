<template>
  <footer class="bg-gray-800 w-full py-4 text-sm text-gray-300">
    <div
        class="w-full px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
    >
      <!-- 左侧 -->
      <div class="flex flex-col gap-1">
        <!-- 第一行 -->
        <div class="flex items-center gap-1">
          <img src="@/assets/svgs/copyright.svg" alt="cc" class="w-4 h-4" />
          <span>2025 GoFurry {{ t('footer.rights') }}</span>
        </div>

        <!-- 第二行 -->
        <div class="flex items-center gap-1">
          <img src="@/assets/svgs/cc-circle.svg" alt="cc" class="w-4 h-4" />
          <span>{{ t('footer.license') }}</span>
        </div>
      </div>

      <!-- 右侧 -->
      <div>
        <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-orange-600"
        >
          {{ t('footer.icp') }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {i18n} from "@/main.ts";

const t = (key: string) => i18n.global.t(key)
</script>

<style scoped>
</style>
