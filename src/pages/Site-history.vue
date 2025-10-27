<!--<template>-->
<!--  <div class="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">-->
<!--    &lt;!&ndash; 顶部导航栏 &ndash;&gt;-->
<!--    <div-->
<!--        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm sticky top-0 z-10"-->
<!--    >-->
<!--      <h2 class="text-lg font-semibold flex items-center gap-2">-->
<!--        <i class="fa fa-globe text-blue-500"></i>-->
<!--        站点详情-->
<!--      </h2>-->
<!--      <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">-->
<!--        <i class="fa fa-arrow-left"></i>-->
<!--      </button>-->
<!--    </div>-->

<!--    &lt;!&ndash; 主要内容区 &ndash;&gt;-->
<!--    <main class="flex-1 container mx-auto p-4 md:p-6 max-w-6xl">-->
<!--      &lt;!&ndash; 1. 顶部概览区：网站基础信息 &ndash;&gt;-->
<!--      <section class="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">-->
<!--        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">-->
<!--          &lt;!&ndash; LOGO &ndash;&gt;-->
<!--          <div class="w-20 h-20 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">-->
<!--            <img-->
<!--                src="https://picsum.photos/200/200?random=1"-->
<!--                alt="兽人控游戏库LOGO"-->
<!--                class="w-full h-full object-contain"-->
<!--                onerror="this.src='https://picsum.photos/200/200?random=fallback'"-->
<!--            >-->
<!--          </div>-->

<!--          &lt;!&ndash; 文字信息区 &ndash;&gt;-->
<!--          <div class="flex-1">-->
<!--            <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">-->
<!--              <h1 class="text-2xl font-bold">兽人控游戏库</h1>-->
<!--              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">-->
<!--                游戏-->
<!--              </span>-->
<!--              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">-->
<!--                兽人控资源-->
<!--              </span>-->
<!--            </div>-->

<!--            <div class="flex items-center mb-3 group">-->
<!--              <span class="text-gray-500 dark:text-gray-400 font-mono cursor-pointer" @click="copyToClipboard('srk.games')">-->
<!--                srk.games-->
<!--              </span>-->
<!--              <span class="ml-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">-->
<!--                点击复制-->
<!--              </span>-->
<!--            </div>-->

<!--            <p class="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">-->
<!--              这里是最全的兽人控游戏索引。收集了各种兽人控游戏。从传统角色扮演兽游到恋爱模拟，或是战略类兽人游戏，甚至更小众的选择，你都能在这里找到。每个游戏都有详尽的介绍和清晰的分类，你可以方便的找到适合你兴趣的完美兽游。无论你是老司机，还是初入兽圈的新手，这个索引都能满足你的需求，或者打开新世界的大门（？-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

<!--      &lt;!&ndash; 2. 核心数据区：延迟与时序图 + 关键指标 &ndash;&gt;-->
<!--      <section class="mb-8">-->
<!--        &lt;!&ndash; 关键指标卡片 &ndash;&gt;-->
<!--        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">-->
<!--          &lt;!&ndash; 响应时间卡片 &ndash;&gt;-->
<!--          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all hover:shadow-md border-l-4 border-red-500">-->
<!--            <div class="flex items-center justify-between mb-2">-->
<!--              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">响应时间</h3>-->
<!--              <i class="fa fa-clock-o text-red-500"></i>-->
<!--            </div>-->
<!--            <p class="text-2xl font-bold">3593ms</p>-->
<!--            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">页面加载耗时</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; HTTP状态码卡片 &ndash;&gt;-->
<!--          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all hover:shadow-md border-l-4 border-green-500">-->
<!--            <div class="flex items-center justify-between mb-2">-->
<!--              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">HTTP状态码</h3>-->
<!--              <i class="fa fa-check-circle text-green-500"></i>-->
<!--            </div>-->
<!--            <p class="text-2xl font-bold">200</p>-->
<!--            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">访问正常</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; TLS版本卡片 &ndash;&gt;-->
<!--          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all hover:shadow-md border-l-4 border-blue-500">-->
<!--            <div class="flex items-center justify-between mb-2">-->
<!--              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">TLS版本</h3>-->
<!--              <i class="fa fa-shield text-blue-500"></i>-->
<!--            </div>-->
<!--            <p class="text-2xl font-bold">TLS 1.3</p>-->
<!--            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">安全加密协议</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; 证书有效期卡片 &ndash;&gt;-->
<!--          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all hover:shadow-md border-l-4 border-yellow-500">-->
<!--            <div class="flex items-center justify-between mb-2">-->
<!--              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">证书有效期</h3>-->
<!--              <i class="fa fa-calendar text-yellow-500"></i>-->
<!--            </div>-->
<!--            <p class="text-2xl font-bold">59天</p>-->
<!--            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">证书剩余有效期</p>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; 延迟时序图 &ndash;&gt;-->
<!--        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all hover:shadow-md">-->
<!--          <div class="flex items-center justify-between mb-4">-->
<!--            <h3 class="font-semibold">延迟趋势 (近24小时)</h3>-->
<!--            <div class="text-xs text-gray-500 dark:text-gray-400">-->
<!--              数据更新于: 2025-10-11 05:16-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="h-64 w-full" ref="latencyChartRef"></div>-->
<!--        </div>-->
<!--      </section>-->

<!--      &lt;!&ndash; 3. 技术详情区：HTTP + TLS + DNS 记录 &ndash;&gt;-->
<!--      <section class="mb-8 space-y-6">-->
<!--        &lt;!&ndash; HTTP 记录面板 &ndash;&gt;-->
<!--        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md overflow-hidden">-->
<!--          <div class="p-5 cursor-pointer flex items-center justify-between" @click="togglePanel('http')">-->
<!--            <h3 class="font-semibold flex items-center gap-2">-->
<!--              <i class="fa fa-globe text-blue-500"></i>-->
<!--              HTTP 记录-->
<!--            </h3>-->
<!--            <i class="fa" :class="panels.http ? 'fa-chevron-up' : 'fa-chevron-down'"></i>-->
<!--          </div>-->

<!--          <div v-if="panels.http" class="border-t border-gray-100 dark:border-gray-700 p-5 pt-4">-->
<!--            &lt;!&ndash; 核心信息 &ndash;&gt;-->
<!--            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">访问 URL</h4>-->
<!--                <p class="font-mono text-sm hover:text-blue-500 cursor-pointer">https://srk.games</p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">状态码</h4>-->
<!--                <p class="text-sm"><span class="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-xs">200 OK</span></p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">响应时间</h4>-->
<!--                <p class="text-sm">3593ms</p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">内容大小</h4>-->
<!--                <p class="text-sm">297.7 KB (297696 B)</p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">服务器</h4>-->
<!--                <p class="text-sm">cloudflare</p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">页面标题</h4>-->
<!--                <p class="text-sm">兽人控游戏库</p>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; 跳转记录 &ndash;&gt;-->
<!--            <div class="mb-6">-->
<!--              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">重定向路径</h4>-->
<!--              <div class="flex flex-wrap items-center gap-2 text-sm font-mono">-->
<!--                <span>https://srk.games</span>-->
<!--                <i class="fa fa-arrow-right text-gray-400"></i>-->
<!--                <span>https://srk.games/zh-Hans/</span>-->
<!--                <i class="fa fa-arrow-right text-gray-400"></i>-->
<!--                <span>https://srk.games/zh-Hans</span>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; 响应头 &ndash;&gt;-->
<!--            <div class="mb-6">-->
<!--              <div class="flex items-center justify-between mb-2">-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">响应头</h4>-->
<!--                <button class="text-xs text-blue-500" @click="toggleSection('httpHeaders')">-->
<!--                  {{ sections.httpHeaders ? '收起' : '展开' }}-->
<!--                </button>-->
<!--              </div>-->

<!--              <div v-if="sections.httpHeaders" class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-sm">-->
<!--                <div class="mb-1"><span class="font-medium">Content-Type:</span> text/html; charset=utf-8</div>-->
<!--                <div class="mb-1"><span class="font-medium">Server:</span> cloudflare</div>-->
<!--                &lt;!&ndash; 可以添加更多响应头 &ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; 元数据 &ndash;&gt;-->
<!--            <div>-->
<!--              <div class="flex items-center justify-between mb-2">-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">元数据</h4>-->
<!--                <button class="text-xs text-blue-500" @click="toggleSection('httpMeta')">-->
<!--                  {{ sections.httpMeta ? '收起' : '展开' }}-->
<!--                </button>-->
<!--              </div>-->

<!--              <div v-if="sections.httpMeta" class="space-y-3 text-sm">-->
<!--                <div>-->
<!--                  <span class="font-medium">编码:</span> utf-8-->
<!--                </div>-->
<!--                <div>-->
<!--                  <span class="font-medium">描述:</span> 这里是最全的兽人控游戏索引。收集了各种兽人控游戏...-->
<!--                </div>-->
<!--                <div>-->
<!--                  <span class="font-medium">关键词:</span>-->
<!--                  <div class="flex flex-wrap gap-1 mt-1">-->
<!--                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">#兽游</span>-->
<!--                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">#兽人游戏</span>-->
<!--                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">#兽人控</span>-->
<!--                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">#兽人控游戏</span>-->
<!--                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">#兽人游戏库</span>-->
<!--                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">#兽人控游戏库</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; TLS 记录面板 &ndash;&gt;-->
<!--        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md overflow-hidden">-->
<!--          <div class="p-5 cursor-pointer flex items-center justify-between" @click="togglePanel('tls')">-->
<!--            <h3 class="font-semibold flex items-center gap-2">-->
<!--              <i class="fa fa-lock text-green-500"></i>-->
<!--              TLS 记录-->
<!--            </h3>-->
<!--            <i class="fa" :class="panels.tls ? 'fa-chevron-up' : 'fa-chevron-down'"></i>-->
<!--          </div>-->

<!--          <div v-if="panels.tls" class="border-t border-gray-100 dark:border-gray-700 p-5 pt-4">-->
<!--            <div class="space-y-4 text-sm">-->
<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">加密协议</h4>-->
<!--                <p><span class="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-xs">TLS 1.3</span> <span class="text-green-500 text-xs ml-1">安全</span></p>-->
<!--              </div>-->

<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">密码套件</h4>-->
<!--                <p>AES_128_GCM_SHA256</p>-->
<!--              </div>-->

<!--              <div>-->
<!--                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">证书信息</h4>-->
<!--                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">-->
<!--                  <div><span class="font-medium">有效期:</span> 2025-12-01 03:39:33（剩余 <span class="text-yellow-500">59 天</span>）</div>-->
<!--                  <div><span class="font-medium">颁发者:</span> 机构：Google Trust Services（WE1）</div>-->
<!--                  <div><span class="font-medium">覆盖域名:</span> srk.games</div>-->
<!--                  <div><span class="font-medium">是否为 CA 证书:</span> 否</div>-->
<!--                  <div><span class="font-medium">DNS 劫持检测:</span> <span class="text-green-500">未劫持</span></div>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div>-->
<!--                <button class="text-xs text-blue-500" @click="toggleSection('tlsDetails')">-->
<!--                  {{ sections.tlsDetails ? '收起算法细节' : '查看算法细节' }}-->
<!--                </button>-->

<!--                <div v-if="sections.tlsDetails" class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mt-2 space-y-2">-->
<!--                  <div><span class="font-medium">公钥算法:</span> ECDSA</div>-->
<!--                  <div><span class="font-medium">签名算法:</span> ECDSA-SHA256</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; DNS 记录面板 &ndash;&gt;-->
<!--        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md overflow-hidden">-->
<!--          <div class="p-5 cursor-pointer flex items-center justify-between" @click="togglePanel('dns')">-->
<!--            <h3 class="font-semibold flex items-center gap-2">-->
<!--              <i class="fa fa-server text-purple-500"></i>-->
<!--              DNS 记录-->
<!--            </h3>-->
<!--            <i class="fa" :class="panels.dns ? 'fa-chevron-up' : 'fa-chevron-down'"></i>-->
<!--          </div>-->

<!--          <div v-if="panels.dns" class="border-t border-gray-100 dark:border-gray-700">-->
<!--            &lt;!&ndash; DNS 记录类型切换 &ndash;&gt;-->
<!--            <div class="flex overflow-x-auto border-b border-gray-100 dark:border-gray-700">-->
<!--              <button-->
<!--                  v-for="type in dnsTypes"-->
<!--                  :key="type"-->
<!--                  @click="setDnsType(type)"-->
<!--                  class="px-4 py-3 whitespace-nowrap text-sm font-medium"-->
<!--                  :class="activeDnsType === type ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"-->
<!--              >-->
<!--                {{ type }}-->
<!--              </button>-->
<!--            </div>-->

<!--            &lt;!&ndash; DNS 记录内容 &ndash;&gt;-->
<!--            <div class="p-5">-->
<!--              <div class="overflow-x-auto">-->
<!--                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">-->
<!--                  <thead>-->
<!--                  <tr>-->
<!--                    <th class="px-3 py-3 bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tl-lg">类型</th>-->
<!--                    <th class="px-3 py-3 bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">值</th>-->
<!--                    <th class="px-3 py-3 bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TTL</th>-->
<!--                    <th class="px-3 py-3 bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">DNSSEC</th>-->
<!--                    <th class="px-3 py-3 bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tr-lg">更多</th>-->
<!--                  </tr>-->
<!--                  </thead>-->
<!--                  <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">-->
<!--                  &lt;!&ndash; A 记录示例 &ndash;&gt;-->
<!--                  <template v-if="activeDnsType === 'A'">-->
<!--                    <tr v-for="(record, index) in dnsData.A" :key="index">-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">{{ record.type }}</td>-->
<!--                      <td class="px-3 py-3 text-sm max-w-xs truncate hover:whitespace-normal hover:max-w-none">-->
<!--                        <span class="text-blue-500 cursor-pointer hover:underline">{{ record.value }}</span>-->
<!--                      </td>-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">{{ record.ttl }}s</td>-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">-->
<!--                        <span v-if="record.dnssec" class="text-green-500">✓</span>-->
<!--                        <span v-else class="text-gray-400">✗</span>-->
<!--                      </td>-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">-->
<!--                        <button class="text-blue-500 text-xs" @click="toggleDnsDetails('A', index)">-->
<!--                          {{ dnsDetails['A'] && dnsDetails['A'][index] ? '收起' : '展开' }}-->
<!--                        </button>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                    &lt;!&ndash; 展开的详情 &ndash;&gt;-->
<!--                    <tr v-for="(record, index) in dnsData.A" :key="'detail-' + index" v-if="dnsDetails['A'] && dnsDetails['A'][index]">-->
<!--                      <td colspan="5" class="px-3 py-2 bg-gray-50 dark:bg-gray-700/30 text-xs">-->
<!--                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">-->
<!--                          <div><span class="font-medium">ASN:</span> {{ record.asn }}</div>-->
<!--                          <div><span class="font-medium">国家:</span> {{ record.country }}</div>-->
<!--                          <div><span class="font-medium">城市:</span> {{ record.city }}</div>-->
<!--                          <div><span class="font-medium">服务商类型:</span> {{ record.provider_type }}</div>-->
<!--                          <div><span class="font-medium">ISP:</span> {{ record.isp }}</div>-->
<!--                          <div><span class="font-medium">劫持检测:</span> {{ record.hijacked ? '是' : '否' }}</div>-->
<!--                        </div>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                  </template>-->

<!--                  &lt;!&ndash; TXT 记录示例 &ndash;&gt;-->
<!--                  <template v-if="activeDnsType === 'TXT'">-->
<!--                    <tr v-for="(record, index) in dnsData.TXT" :key="index">-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">{{ record.type }}</td>-->
<!--                      <td class="px-3 py-3 text-sm max-w-xs truncate hover:whitespace-normal hover:max-w-none font-mono">-->
<!--                        {{ record.value }}-->
<!--                      </td>-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">{{ record.ttl }}s</td>-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">-->
<!--                        <span v-if="record.dnssec" class="text-green-500">✓</span>-->
<!--                        <span v-else class="text-gray-400">✗</span>-->
<!--                      </td>-->
<!--                      <td class="px-3 py-3 whitespace-nowrap text-sm">-->
<!--                        <span class="text-gray-400 text-xs">无更多信息</span>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                  </template>-->

<!--                  &lt;!&ndash; 其他类型的DNS记录可以按照类似结构添加 &ndash;&gt;-->
<!--                  <template v-if="['SOA', 'NS', 'AAAA', 'MX', 'CNAME', 'CAA'].includes(activeDnsType)">-->
<!--                    <tr>-->
<!--                      <td colspan="5" class="px-3 py-6 text-center text-gray-500 dark:text-gray-400">-->
<!--                        该类型DNS记录数据已省略，实际应用中按A记录格式实现-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                  </template>-->
<!--                  </tbody>-->
<!--                </table>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

<!--      &lt;!&ndash; 4. 底部操作区：功能按钮 &ndash;&gt;-->
<!--      <section class="mb-8 flex flex-wrap gap-3 justify-end">-->
<!--        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 transition-colors">-->
<!--          <i class="fa fa-refresh"></i>-->
<!--          刷新数据-->
<!--        </button>-->
<!--        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 transition-colors">-->
<!--          <i class="fa fa-exclamation-triangle"></i>-->
<!--          报错反馈-->
<!--        </button>-->
<!--        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 transition-colors">-->
<!--          <i class="fa fa-star-o"></i>-->
<!--          收藏网站-->
<!--        </button>-->
<!--        <button class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">-->
<!--          <i class="fa fa-external-link"></i>-->
<!--          访问网站-->
<!--        </button>-->
<!--      </section>-->
<!--    </main>-->

<!--    &lt;!&ndash; 页脚 &ndash;&gt;-->
<!--    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">-->
<!--      <p>© 2025 导航网站 - 数据仅供参考</p>-->
<!--    </footer>-->

<!--    &lt;!&ndash; 复制成功提示 &ndash;&gt;-->
<!--    <div v-if="showCopyToast" class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 animate-fade-in-out">-->
<!--      已复制到剪贴板-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { useRoute } from "vue-router";-->
<!--import { ref, onMounted, nextTick } from "vue";-->
<!--import * as echarts from 'echarts';-->

<!--const route = useRoute();-->
<!--const siteId = route.params.id; // 站点 ID-->
<!--console.log("当前站点 ID:", siteId);-->

<!--// 图表容器引用-->
<!--const latencyChartRef = ref<HTMLDivElement>(null);-->

<!--// 面板状态管理-->
<!--const panels = ref({-->
<!--  http: true,-->
<!--  tls: false,-->
<!--  dns: false-->
<!--});-->

<!--// 子区域状态管理-->
<!--const sections = ref({-->
<!--  httpHeaders: false,-->
<!--  httpMeta: true,-->
<!--  tlsDetails: false-->
<!--});-->

<!--// DNS 记录类型和数据-->
<!--const dnsTypes = ref(['A', 'TXT', 'SOA', 'NS', 'AAAA', 'MX', 'CNAME', 'CAA']);-->
<!--const activeDnsType = ref('A');-->
<!--const dnsDetails = ref({});-->

<!--// 模拟DNS数据-->
<!--const dnsData = ref({-->
<!--  A: [-->
<!--    {-->
<!--      type: "A",-->
<!--      value: "172.66.160.235",-->
<!--      ttl: 300,-->
<!--      dnssec: true,-->
<!--      asn: "Unknown",-->
<!--      country: "Unknown",-->
<!--      city: "Unknown",-->
<!--      provider_type: "Origin",-->
<!--      isp: "Unknown",-->
<!--      hijacked: false-->
<!--    },-->
<!--    {-->
<!--      type: "A",-->
<!--      value: "104.20.31.112",-->
<!--      ttl: 300,-->
<!--      dnssec: true,-->
<!--      asn: "Unknown",-->
<!--      country: "Unknown",-->
<!--      city: "Unknown",-->
<!--      provider_type: "Origin",-->
<!--      isp: "Unknown",-->
<!--      hijacked: false-->
<!--    }-->
<!--  ],-->
<!--  TXT: [-->
<!--    {-->
<!--      type: "TXT",-->
<!--      value: "google-site-verification=4Eft3hJTbdIkzOy_RrtvrtMgnhm_CnhCFnSjx05C47k",-->
<!--      ttl: 300,-->
<!--      dnssec: true-->
<!--    },-->
<!--    {-->
<!--      type: "TXT",-->
<!--      value: "v=spf1 a mx include:mailgun.org include:_spf.google.com -all",-->
<!--      ttl: 300,-->
<!--      dnssec: true-->
<!--    }-->
<!--  ],-->
<!--  SOA: [],-->
<!--  NS: [],-->
<!--  AAAA: [],-->
<!--  MX: [],-->
<!--  CNAME: [],-->
<!--  CAA: []-->
<!--});-->

<!--// 复制到剪贴板功能-->
<!--const showCopyToast = ref(false);-->
<!--const copyToClipboard = (text: string) => {-->
<!--  navigator.clipboard.writeText(text).then(() => {-->
<!--    showCopyToast.value = true;-->
<!--    setTimeout(() => {-->
<!--      showCopyToast.value = false;-->
<!--    }, 2000);-->
<!--  });-->
<!--};-->

<!--// 切换面板显示/隐藏-->
<!--const togglePanel = (panel: string) => {-->
<!--  panels.value[panel] = !panels.value[panel];-->
<!--};-->

<!--// 切换子区域显示/隐藏-->
<!--const toggleSection = (section: string) => {-->
<!--  sections.value[section] = !sections.value[section];-->
<!--};-->

<!--// 设置当前DNS记录类型-->
<!--const setDnsType = (type: string) => {-->
<!--  activeDnsType.value = type;-->
<!--};-->

<!--// 切换DNS详情显示/隐藏-->
<!--const toggleDnsDetails = (type: string, index: number) => {-->
<!--  if (!dnsDetails.value[type]) {-->
<!--    dnsDetails.value[type] = [];-->
<!--  }-->
<!--  dnsDetails.value[type][index] = !dnsDetails.value[type][index];-->
<!--};-->

<!--// 初始化延迟趋势图 - 使用ECharts-->
<!--const initLatencyChart = () => {-->
<!--  // 确保DOM已渲染-->
<!--  nextTick(() => {-->
<!--    if (!latencyChartRef.value) return;-->

<!--    // 初始化图表实例-->
<!--    const chart = echarts.init(latencyChartRef.value);-->

<!--    // 生成过去24小时的时间标签-->
<!--    const labels = [];-->
<!--    const now = new Date();-->
<!--    for (let i = 23; i >= 0; i&#45;&#45;) {-->
<!--      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);-->
<!--      labels.push(`${hour.getHours()}:00`);-->
<!--    }-->

<!--    // 生成模拟的延迟数据-->
<!--    const baseLatency = 3500;-->
<!--    const data = labels.map(() => {-->
<!--      // 随机波动 ±500ms-->
<!--      return Math.round(baseLatency + (Math.random() * 1000 - 500));-->
<!--    });-->

<!--    // 配置图表选项-->
<!--    const option = {-->
<!--      tooltip: {-->
<!--        trigger: 'axis',-->
<!--        formatter: function(params: any) {-->
<!--          return `时间: ${params[0].name}<br>延迟: ${params[0].value}ms`;-->
<!--        }-->
<!--      },-->
<!--      grid: {-->
<!--        left: '3%',-->
<!--        right: '4%',-->
<!--        bottom: '3%',-->
<!--        containLabel: true-->
<!--      },-->
<!--      xAxis: {-->
<!--        type: 'category',-->
<!--        boundaryGap: false,-->
<!--        data: labels,-->
<!--        axisLine: {-->
<!--          lineStyle: {-->
<!--            color: '#e5e7eb'-->
<!--          }-->
<!--        },-->
<!--        axisLabel: {-->
<!--          color: '#6b7280'-->
<!--        }-->
<!--      },-->
<!--      yAxis: {-->
<!--        type: 'value',-->
<!--        min: 0,-->
<!--        max: 5000,-->
<!--        interval: 1000,-->
<!--        axisLine: {-->
<!--          lineStyle: {-->
<!--            color: '#e5e7eb'-->
<!--          }-->
<!--        },-->
<!--        axisLabel: {-->
<!--          color: '#6b7280',-->
<!--          formatter: '{value}ms'-->
<!--        },-->
<!--        splitLine: {-->
<!--          lineStyle: {-->
<!--            color: 'rgba(0, 0, 0, 0.05)'-->
<!--          }-->
<!--        },-->
<!--        // 添加警告线-->
<!--        splitArea: {-->
<!--          areaStyle: {-->
<!--            color: [-->
<!--              'rgba(239, 68, 68, 0.05)',  // 红色区域 - 高于3000ms-->
<!--              'transparent',-->
<!--              'transparent'-->
<!--            ]-->
<!--          },-->
<!--          interval: function(index: number) {-->
<!--            return index === 3;  // 只显示3000ms处的分隔区域-->
<!--          }-->
<!--        }-->
<!--      },-->
<!--      series: [-->
<!--        {-->
<!--          name: '延迟',-->
<!--          type: 'line',-->
<!--          data: data,-->
<!--          symbol: 'circle',-->
<!--          symbolSize: 6,-->
<!--          lineStyle: {-->
<!--            width: 2,-->
<!--            color: '#4299E1'-->
<!--          },-->
<!--          itemStyle: {-->
<!--            color: '#FFFFFF',-->
<!--            borderColor: '#4299E1',-->
<!--            borderWidth: 2-->
<!--          },-->
<!--          emphasis: {-->
<!--            symbolSize: 8-->
<!--          },-->
<!--          areaStyle: {-->
<!--            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [-->
<!--              { offset: 0, color: 'rgba(66, 153, 225, 0.2)' },-->
<!--              { offset: 1, color: 'rgba(66, 153, 225, 0)' }-->
<!--            ])-->
<!--          },-->
<!--          smooth: true-->
<!--        }-->
<!--      ]-->
<!--    };-->

<!--    // 应用配置-->
<!--    chart.setOption(option);-->

<!--    // 响应窗口大小变化-->
<!--    window.addEventListener('resize', () => {-->
<!--      chart.resize();-->
<!--    });-->

<!--    // 组件卸载时销毁图表-->
<!--    const cleanup = () => {-->
<!--      window.removeEventListener('resize', () => chart.resize());-->
<!--      chart.dispose();-->
<!--    };-->

<!--    // 在Vue组件卸载时执行清理-->
<!--    // 注意：在实际项目中，你可能需要使用onUnmounted钩子来调用cleanup-->
<!--  });-->
<!--};-->

<!--// 页面加载完成后初始化图表-->
<!--onMounted(() => {-->
<!--  initLatencyChart();-->
<!--});-->
<!--</script>-->

<!--<style>-->
<!--/* 自定义动画 */-->
<!--@keyframes fade-in-out {-->
<!--  0% { opacity: 0; transform: translateY(10px); }-->
<!--  10% { opacity: 1; transform: translateY(0); }-->
<!--  90% { opacity: 1; transform: translateY(0); }-->
<!--  100% { opacity: 0; transform: translateY(10px); }-->
<!--}-->

<!--.animate-fade-in-out {-->
<!--  animation: fade-in-out 2s ease-in-out forwards;-->
<!--}-->
<!--</style>-->
