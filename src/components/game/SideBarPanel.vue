<template>
  <div class="bg-white/50 backdrop-blur-md rounded-2xl shadow p-6 min-h-[900px]">
    <!-- 顶部搜索 -->
    <div class="mb-2">
      <GameSidebarSearch />
    </div>

    <!-- 快捷功能 -->
    <GameSidebarActions>
      <!-- 默认前6个网站 -->
      <template #default-sites>
        <GameSiteItem href="https://store.steampowered.com" :icon="steamIcon" title="Steam" subtitle="steam" />
        <GameSiteItem href="https://itch.io" :icon="itchIcon" title="itch.io" subtitle="itch" />
        <GameSiteItem href="https://srk.games/" :icon="srkIcon" title="兽人控游戏库" subtitle="srkGames" />
        <GameSiteItem href="https://furrygames.top/" :icon="defaultLogo" title="兽人控游戏索引" subtitle="furryGames" />
        <GameSiteItem href="https://f95zone.to.it/tag/furry/" :icon="f95Icon" title="F95Zone" subtitle="f95zoneFurry" />
        <GameSiteItem href="https://byrutgame.org/" :icon="byrutIcon" title="ByRUT Game" subtitle="byrut" />
      </template>

      <!-- 可展开的更多网站 -->
      <template #extra-sites>
        <GameSiteItem href="https://afdian.com/" :icon="afdianIcon" title="爱发电" subtitle="afdian" />
        <GameSiteItem href="https://www.patreon.com/" :icon="patreonIcon" title="Patreon" subtitle="patreon" />
        <GameSiteItem href="https://www.kickstarter.com/" :icon="kickstarterIcon" title="Kickstarter" subtitle="kickstarter" />
        <GameSiteItem href="https://steamdb.info" :icon="steamdbIcon" title="SteamDB" subtitle="steamDB" />
        <GameSiteItem href="https://steambase.io" :icon="steambaseIcon" title="SteamBase" subtitle="steamBase" />
        <GameSiteItem href="https://playtracker.net" :icon="playtrackerIcon" title="PlayTracker" subtitle="playTracker" />
        <GameSiteItem href="https://app.sensortower.com/vgi" :icon="sensortowerIcon" title="Sensor Tower" subtitle="sensorTower" />
        <GameSiteItem href="https://gamalytic.com" :icon="gamalyticIcon" title="Gamalytic" subtitle="gamalytic" />
        <GameSiteItem href="https://www.metacritic.com/" :icon="metacriticIcon" title="Metacritic" subtitle="metacritic" />
        <GameSiteItem href="https://www.pcgamingwiki.com/" :icon="pcgamingwikiIcon" title="PCGamingWiki" subtitle="pcGamingWiki" />
        <GameSiteItem href="https://gamefaqs.gamespot.com/" :icon="gamefaqsIcon" title="GameFAQs" subtitle="gameFAQs" />
      </template>
    </GameSidebarActions>

    <!-- 近期评论 -->
    <GameSidebarLatestReviews />
  </div>
</template>

<script setup lang="ts">
import GameSidebarActions from "@/components/game/GameSidebarActions.vue";
import GameSidebarSearch from "@/components/game/GameSidebarSearch.vue";
import GameSidebarLatestReviews from "@/components/game/GameSidebarLatestReviews.vue";
import GameSiteItem from "@/components/game/GameSiteItem.vue";

const logoPrefix = import.meta.env.VITE_SITE_LOGO_PREFIX_URL || '';
const defaultLogo = `${logoPrefix}defaultLogo.svg`;

// 获取真实路径
const steamIcon = new URL('@/assets/icons/gameSites/store.steampowered.com-favicon.ico', import.meta.url).href;
const itchIcon = new URL('@/assets/icons/gameSites/itch.io-favicon.ico', import.meta.url).href;
const srkIcon = new URL('@/assets/icons/gameSites/srk.games-favicon.ico', import.meta.url).href;
const f95Icon = new URL('@/assets/icons/gameSites/f95zone.to.it-favicon.ico', import.meta.url).href;
const byrutIcon = new URL('@/assets/icons/gameSites/byrutgame.org-favicon.ico', import.meta.url).href;
const afdianIcon = new URL('@/assets/icons/gameSites/afdian.com-favicon.ico', import.meta.url).href;
const patreonIcon = new URL('@/assets/icons/gameSites/www.patreon.com-favicon.ico', import.meta.url).href;
const kickstarterIcon = new URL('@/assets/icons/gameSites/www.kickstarter.com-favicon.ico', import.meta.url).href;
const steamdbIcon = new URL('@/assets/icons/gameSites/steamdb.info-favicon.ico', import.meta.url).href;
const steambaseIcon = new URL('@/assets/icons/gameSites/steambase.io-favicon.ico', import.meta.url).href;
const playtrackerIcon = new URL('@/assets/icons/gameSites/playtracker.net-favicon.ico', import.meta.url).href;
const sensortowerIcon = new URL('@/assets/icons/gameSites/app.sensortower.com-favicon.ico', import.meta.url).href;
const gamalyticIcon = new URL('@/assets/icons/gameSites/gamalytic.com-favicon.ico', import.meta.url).href;
const metacriticIcon = new URL('@/assets/icons/gameSites/metacritic.com-favicon-32.png', import.meta.url).href;
const pcgamingwikiIcon = new URL('@/assets/icons/gameSites/www.pcgamingwiki.com-favicon.ico', import.meta.url).href;
const gamefaqsIcon = new URL('@/assets/icons/gameSites/gamefaqs.gamespot.com-favicon.ico', import.meta.url).href;
</script>
