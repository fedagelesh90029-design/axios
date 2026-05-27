<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, Filter, LayoutGrid, List, ChevronDown } from 'lucide-vue-next'
import { products, categories } from '../data/mock'
import ProductCard from '../components/ui/ProductCard.vue'

const route = useRoute()

// State
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('popular')

// Computed
const currentCategory = computed(() => {
  const slug = route.params.category
  return categories.find(c => c.slug === slug) || { name: 'Все товары', slug: 'all' }
})

const filteredProducts = computed(() => {
  let result = [...products]
  
  // Filter by search query
  const q = route.query.q as string
  if (q) {
    const searchLower = q.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.brand.toLowerCase().includes(searchLower)
    )
  }

  // Filter by category
  if (route.params.category) {
    result = result.filter(p => p.categorySlug === route.params.category)
  }

  // Sort
  if (sortBy.value === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') result.sort((a, b) => b.price - a.price)
  
  return result
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    <!-- Breadcrumbs -->
    <div class="container mx-auto px-4 py-6">
      <nav class="flex items-center gap-2 text-sm text-gray-400 font-medium">
        <router-link to="/" class="hover:text-istok-blue transition-colors">Главная</router-link>
        <ChevronRight :size="14" />
        <router-link to="/catalog" class="hover:text-istok-blue transition-colors">Каталог</router-link>
        <template v-if="route.params.category">
          <ChevronRight :size="14" />
          <span class="text-gray-900">{{ currentCategory.name }}</span>
        </template>
      </nav>
      <h1 class="text-4xl font-black text-gray-900 mt-6">{{ currentCategory.name }}</h1>
    </div>

    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-40">
            <div class="flex justify-between items-center mb-8">
              <h3 class="font-bold text-gray-900 flex items-center gap-2">
                <Filter :size="18" class="text-istok-blue" />
                Фильтры
              </h3>
              <button class="text-xs text-istok-blue font-bold hover:underline">Сбросить</button>
            </div>

            <!-- Categories -->
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-900 mb-4 flex justify-between items-center group cursor-pointer">
                Категории
                <ChevronDown :size="16" class="text-gray-400 group-hover:text-istok-blue transition-colors" />
              </h4>
              <ul class="space-y-3">
                <li v-for="cat in categories" :key="cat.slug">
                  <router-link 
                    :to="'/catalog/' + cat.slug" 
                    class="text-sm text-gray-600 hover:text-istok-blue flex justify-between items-center transition-colors"
                    :class="{ 'text-istok-blue font-bold': route.params.category === cat.slug }"
                  >
                    {{ cat.name }}
                    <span class="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-400">24</span>
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Price -->
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-900 mb-4">Цена, ₽</h4>
              <div class="grid grid-cols-2 gap-3 mb-4">
                <input type="number" placeholder="От" class="bg-gray-50 border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-istok-blue w-full">
                <input type="number" placeholder="До" class="bg-gray-50 border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-istok-blue w-full">
              </div>
              <input type="range" class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-istok-blue">
            </div>

            <!-- Brands -->
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-900 mb-4">Бренд</h4>
              <div class="space-y-3">
                <label v-for="brand in ['Makita', 'Bosch', 'DeWalt', 'Metabo']" :key="brand" class="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" class="rounded border-gray-300 text-istok-blue focus:ring-istok-blue">
                  <span class="text-sm text-gray-600 group-hover:text-istok-blue transition-colors">{{ brand }}</span>
                </label>
              </div>
            </div>

            <button class="w-full bg-istok-blue text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-istok-blue/20 hover:bg-istok-dark-blue transition-all">
              Показать товары
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-grow">
          <!-- Toolbar -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Сортировать:</span>
                <select v-model="sortBy" class="bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0 cursor-pointer p-0">
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                </select>
              </div>
              <span class="text-sm text-gray-400">Найдено {{ filteredProducts.length }} товаров</span>
            </div>

            <div class="flex items-center bg-gray-50 rounded-lg p-1">
              <button 
                @click="viewMode = 'grid'" 
                class="p-2 rounded-md transition-all"
                :class="viewMode === 'grid' ? 'bg-white shadow-sm text-istok-blue' : 'text-gray-400 hover:text-gray-600'"
              >
                <LayoutGrid :size="18" />
              </button>
              <button 
                @click="viewMode = 'list'" 
                class="p-2 rounded-md transition-all"
                :class="viewMode === 'list' ? 'bg-white shadow-sm text-istok-blue' : 'text-gray-400 hover:text-gray-600'"
              >
                <List :size="18" />
              </button>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
          </div>
          
          <!-- List View (Simple version) -->
          <div v-else class="space-y-4">
            <div v-for="product in filteredProducts" :key="product.id" class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
              <div class="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl p-2">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-contain">
              </div>
              <div class="flex-grow flex flex-col justify-between py-1">
                <div>
                  <h3 class="font-bold text-gray-800 hover:text-istok-blue cursor-pointer mb-2">{{ product.name }}</h3>
                  <div class="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span>Артикул: {{ 1000 + product.id }}</span>
                    <span class="text-emerald-600">В наличии</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-2">
                    <span class="text-xl font-black text-gray-900">{{ product.price }} ₽</span>
                    <span v-if="product.oldPrice" class="text-sm text-gray-400 line-through">{{ product.oldPrice }} ₽</span>
                  </div>
                  <button class="bg-istok-blue text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-istok-dark-blue transition-colors">
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-12 flex justify-center gap-2">
            <button class="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white border border-gray-200 text-gray-400 hover:border-istok-blue hover:text-istok-blue transition-all cursor-not-allowed">
              &lt;
            </button>
            <button class="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-istok-blue text-white shadow-lg shadow-istok-blue/20">
              1
            </button>
            <button class="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white border border-gray-200 text-gray-600 hover:border-istok-blue hover:text-istok-blue transition-all">
              2
            </button>
            <button class="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white border border-gray-200 text-gray-600 hover:border-istok-blue hover:text-istok-blue transition-all">
              3
            </button>
            <button class="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white border border-gray-200 text-gray-600 hover:border-istok-blue hover:text-istok-blue transition-all">
              &gt;
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
