<template>
  <div class="flex flex-col w-full h-[100vh]">
    <!-- 标题 -->
    <div
        class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-100 backdrop-blur-sm shadow-sm"
    >
      <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <img src="@/assets/svgs/api-dark.svg" alt="api" class="w-5 h-5" />
        本站 API 文档
      </h2>
      <button
          class="px-3 py-1 text-sm rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow"
          @click="debouncedRefresh"
      >
        刷新
      </button>
    </div>

    <!-- 状态提示 -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-gray-500 text-lg">
      加载中...
    </div>
    <div v-if="error" class="flex-1 flex items-center justify-center text-red-500 text-lg">
      {{ error }}
    </div>

    <!-- Swagger UI -->
    <div
        v-show="!loading && !error"
        id="swaggerContainer"
        class="flex-1 w-full overflow-auto"
    ></div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Footer from "@/components/Footer.vue";
import SwaggerUI from "swagger-ui-dist/swagger-ui-bundle.js";
import "swagger-ui-dist/swagger-ui.css";

// 文档地址
const swaggerJsonUrl = import.meta.env.VITE_SWAGGER_URL;

let swaggerInstance: any = null;
const loading = ref(true);
const error = ref("");

// 防抖
function debounce(fn: Function, delay = 300) {
  let timer: number | undefined;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const renderSwagger = async () => {
  if (!swaggerJsonUrl) {
    error.value = "未配置 VITE_SWAGGER_URL";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    // 销毁已有实例
    if (swaggerInstance && swaggerInstance.destroy) {
      swaggerInstance.destroy();
      swaggerInstance = null;
    }

    // 清空容器
    const container = document.getElementById("swaggerContainer");
    if (container) container.innerHTML = "";

    // 初始化 Swagger UI
    swaggerInstance = SwaggerUI({
      dom_id: "#swaggerContainer",
      url: swaggerJsonUrl,
      deepLinking: true,
      presets: [SwaggerUI.presets.apis, SwaggerUI.SwaggerUIStandalonePreset],
      layout: "BaseLayout",
      onComplete: () => {
        loading.value = false;
      },
      onFailure: (err: any) => {
        error.value = "Swagger 加载失败";
        console.error("Swagger 加载失败:", err);
        loading.value = false;
      },
    });
  } catch (err) {
    console.error("加载 Swagger JSON 出错:", err);
    error.value = "Swagger 加载出错";
    loading.value = false;
  }
};

const debouncedRefresh = debounce(renderSwagger, 500);

onMounted(() => {
  renderSwagger();
});

onBeforeUnmount(() => {
  if (swaggerInstance && swaggerInstance.destroy) {
    swaggerInstance.destroy();
    swaggerInstance = null;
  }
});
</script>

<style scoped>
#swaggerContainer {
  height: 100%;
  width: 100%;
}

.flex-1.flex.items-center.justify-center {
  font-size: 1.125rem;
}
</style>
