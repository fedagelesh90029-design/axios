<script setup lang="ts">
import { ref } from 'vue'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  TrendingUp, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-vue-next'
import { products } from '../data/mock'

// State
const activeTab = ref('dashboard')
const searchQuery = ref('')

const stats = [
  { label: 'Продажи за месяц', value: '1.2M ₽', change: '+12%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Новые заказы', value: '48', change: '+5', icon: ShoppingBag, color: 'text-axius-blue bg-axius-blue/10' },
  { label: 'Активных товаров', value: '1,240', change: '0', icon: Package, color: 'text-amber-600 bg-amber-50' },
  { label: 'Пользователи', value: '850', change: '+24', icon: Users, color: 'text-purple-600 bg-purple-50' },
]

const recentOrders = [
  { id: '#4512', customer: 'Иван Иванов', date: '27.05.2026', total: '12,490 ₽', status: 'В обработке' },
  { id: '#4511', customer: 'ООО "СтройКом"', date: '27.05.2026', total: '156,000 ₽', status: 'Новый' },
  { id: '#4510', customer: 'Петр Сидоров', date: '26.05.2026', total: '5,990 ₽', status: 'Выполнен' },
]
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center gap-3 text-slate-900 font-black text-xl tracking-tight">
          <div class="p-2 bg-slate-900 text-white rounded-lg">
            <Settings :size="18" />
          </div>
          Панель
        </div>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <button 
          @click="activeTab = 'dashboard'"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all"
          :class="activeTab === 'dashboard' ? 'bg-axius-blue text-white shadow-lg shadow-axius-blue/20' : 'text-gray-500 hover:bg-gray-50'"
        >
          <LayoutDashboard :size="20" />
          Дашборд
        </button>
        <button 
          @click="activeTab = 'catalog'"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all"
          :class="activeTab === 'catalog' ? 'bg-axius-blue text-white shadow-lg shadow-axius-blue/20' : 'text-gray-500 hover:bg-gray-50'"
        >
          <Package :size="20" />
          Каталог
        </button>
        <button 
          @click="activeTab = 'orders'"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all"
          :class="activeTab === 'orders' ? 'bg-axius-blue text-white shadow-lg shadow-axius-blue/20' : 'text-gray-500 hover:bg-gray-50'"
        >
          <ShoppingBag :size="20" />
          Заказы
        </button>
        <button 
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50"
        >
          <Users :size="20" />
          Пользователи
        </button>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50">
          <Settings :size="20" />
          Настройки
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow p-10 overflow-y-auto">
      <!-- Dashboard View -->
      <div v-if="activeTab === 'dashboard'" class="space-y-10">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-black text-gray-900">Обзор системы</h1>
          <div class="text-sm font-bold text-gray-400">Сегодня: 27 мая 2026</div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-start mb-4">
              <div :class="[stat.color, 'p-3 rounded-2xl']">
                <component :is="stat.icon" :size="24" />
              </div>
              <span class="text-xs font-bold text-emerald-600 flex items-center gap-1">
                {{ stat.change }}
                <ArrowUpRight :size="12" />
              </span>
            </div>
            <div class="text-2xl font-black text-gray-900 mb-1">{{ stat.value }}</div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Последние заказы</h2>
            <button class="text-sm font-bold text-axius-blue hover:underline">Все заказы</button>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50">
                <th class="px-8 py-4">ID</th>
                <th class="px-8 py-4">Покупатель</th>
                <th class="px-8 py-4">Дата</th>
                <th class="px-8 py-4">Сумма</th>
                <th class="px-8 py-4">Статус</th>
                <th class="px-8 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-8 py-5 font-bold text-gray-900">{{ order.id }}</td>
                <td class="px-8 py-5 font-medium text-gray-700">{{ order.customer }}</td>
                <td class="px-8 py-5 text-gray-500">{{ order.date }}</td>
                <td class="px-8 py-5 font-bold text-gray-900">{{ order.total }}</td>
                <td class="px-8 py-5">
                  <span 
                    class="px-3 py-1 rounded-full text-[10px] font-bold uppercase"
                    :class="{
                      'bg-axius-blue/10 text-axius-blue': order.status === 'Новый',
                      'bg-amber-100 text-amber-600': order.status === 'В обработке',
                      'bg-emerald-100 text-emerald-600': order.status === 'Выполнен'
                    }"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-8 py-5 text-right">
                  <button class="p-2 text-gray-400 hover:text-axius-blue transition-colors">
                    <ChevronRight :size="20" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Catalog View -->
      <div v-if="activeTab === 'catalog'" class="space-y-10">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-black text-gray-900">Управление товарами</h1>
          <button class="bg-axius-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-axius-blue/20 hover:bg-axius-dark-blue transition-all">
            <Plus :size="20" />
            Добавить товар
          </button>
        </div>

        <!-- Search and Filters -->
        <div class="flex gap-4">
          <div class="flex-grow relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Поиск по названию или артикулу..." 
              class="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 pl-14 focus:ring-1 focus:ring-axius-blue transition-all shadow-sm"
            >
            <Search class="absolute left-6 top-4.5 text-gray-400" :size="20" />
          </div>
          <select class="bg-white border border-gray-200 rounded-xl px-6 font-bold text-sm focus:ring-1 focus:ring-axius-blue shadow-sm">
            <option>Все категории</option>
            <option>Инструменты</option>
            <option>Крепеж</option>
          </select>
        </div>

        <!-- Products Table -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table class="w-full text-left">
            <thead>
              <tr class="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50">
                <th class="px-8 py-4">Товар</th>
                <th class="px-8 py-4">Артикул</th>
                <th class="px-8 py-4">Цена</th>
                <th class="px-8 py-4">Остаток</th>
                <th class="px-8 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-8 py-5">
                  <div class="flex items-center gap-4">
                    <img :src="product.image" class="w-10 h-10 object-contain bg-gray-50 rounded-lg p-1">
                    <div class="font-bold text-gray-900 text-sm line-clamp-1 max-w-xs">{{ product.name }}</div>
                  </div>
                </td>
                <td class="px-8 py-5 font-medium text-gray-500">{{ 1000 + product.id }}</td>
                <td class="px-8 py-5 font-bold text-gray-900">{{ product.price }} ₽</td>
                <td class="px-8 py-5">
                  <span class="text-sm font-bold text-emerald-600">24 шт.</span>
                </td>
                <td class="px-8 py-5 text-right space-x-2">
                  <button class="p-2 text-gray-400 hover:text-axius-blue transition-colors">
                    <Edit :size="18" />
                  </button>
                  <button class="p-2 text-gray-400 hover:text-axius-red transition-colors">
                    <Trash2 :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Orders View (Stub) -->
      <div v-if="activeTab === 'orders'" class="text-center py-40">
        <ShoppingBag :size="64" class="mx-auto text-gray-200 mb-6" />
        <h2 class="text-2xl font-bold text-gray-900">Управление заказами</h2>
        <p class="text-gray-500">Здесь будет расширенное управление статусами и печать накладных.</p>
      </div>
    </main>
  </div>
</template>

