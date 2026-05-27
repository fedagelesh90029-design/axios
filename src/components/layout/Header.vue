<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, User, ShoppingCart, Phone, ChevronDown, Wrench, Nut, Zap, Droplets, Palette, Box, HardHat, Ruler } from 'lucide-vue-next'
import { navLinks, cart, categories } from '../../data/mock'
import LoginModal from '../ui/LoginModal.vue'
import CartDrawer from '../ui/CartDrawer.vue'

const router = useRouter()
const isLoginOpen = ref(false)
const isCartOpen = ref(false)
const searchQuery = ref('')
const activeDropdown = ref<string | null>(null)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'catalog', query: { q: searchQuery.value } })
    searchQuery.value = ''
  }
}

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Wrench, Nut, Zap, Droplets, Palette, Box, HardHat, Ruler
  }
  return icons[iconName] || Box
}
</script>

<template>
  <header class="w-full bg-white shadow-sm z-50">
    <!-- Top Bar -->
    <div class="bg-axius-blue text-white py-2 px-4 text-sm">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center gap-6">
          <a href="tel:+78622000000" class="flex items-center gap-2 font-medium">
            <Phone :size="14" />
            +7 (862) 200-00-00
          </a>
          <span class="opacity-80">Адлер, ул. Гастелло, 23А</span>
        </div>
        <nav class="hidden md:flex gap-6 opacity-90">
          <a href="#" class="hover:underline">О компании</a>
          <a href="#" class="hover:underline">Доставка</a>
          <a href="#" class="hover:underline">Контакты</a>
        </nav>
      </div>
    </div>

    <!-- Main Header (Sticky) -->
    <div class="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100">
      <div class="container mx-auto flex items-center gap-8 py-4 px-4">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center group">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-axius-blue text-white rounded-xl shadow-lg shadow-axius-blue/20 group-hover:bg-axius-dark-blue transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <span class="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-axius-blue transition-colors uppercase">Axius</span>
            </div>
          </router-link>
        </div>

        <!-- Search Bar -->
        <form @submit.prevent="handleSearch" class="flex-grow max-w-2xl relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Поиск среди 50 000+ товаров..." 
            class="w-full border border-gray-200 rounded-xl py-3.5 px-6 pr-14 focus:border-axius-blue focus:ring-1 focus:ring-axius-blue transition-all bg-gray-50/50"
          >
          <button type="submit" class="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-axius-blue text-white rounded-lg hover:bg-axius-dark-blue transition-all shadow-md shadow-axius-blue/20">
            <Search :size="20" />
          </button>
        </form>

        <!-- User Actions -->
        <div class="flex items-center gap-6 text-sm font-bold text-gray-700">
          <button @click="isLoginOpen = true" class="flex items-center gap-2.5 hover:text-axius-blue transition-colors group">
            <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-axius-blue/10 transition-colors">
              <User :size="20" />
            </div>
            Вход
          </button>
          <button @click="isCartOpen = true" class="flex items-center gap-2.5 hover:text-axius-blue transition-colors group relative">
            <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-axius-blue/10 transition-colors">
              <ShoppingCart :size="20" />
            </div>
            Корзина
            <span v-if="cart.totalCount.value > 0" class="absolute top-0 right-0 bg-axius-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white -mt-1 -mr-1">
              {{ cart.totalCount.value }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation with Dropdowns -->
    <nav class="bg-white border-b border-gray-100 relative shadow-sm">
      <div class="container mx-auto px-4">
        <ul class="flex whitespace-nowrap gap-2 py-1 text-sm font-bold text-gray-600">
          <li class="relative group py-3 px-3">
            <router-link to="/catalog" class="hover:text-axius-blue transition-colors flex items-center gap-2" active-class="text-axius-blue">
              <div class="w-5 h-5 flex items-center justify-center">
                <span class="w-1.5 h-1.5 rounded-full bg-axius-blue"></span>
              </div>
              Каталог
            </router-link>
          </li>
          
          <li 
            v-for="link in navLinks" 
            :key="link.slug"
            class="relative py-3 px-3 cursor-pointer group"
            @mouseenter="activeDropdown = link.slug"
            @mouseleave="activeDropdown = null"
          >
            <div 
              class="flex items-center gap-1.5 hover:text-axius-blue transition-colors"
              :class="{ 'text-axius-blue': activeDropdown === link.slug }"
            >
              <router-link :to="'/catalog/' + link.slug">{{ link.name }}</router-link>
              <ChevronDown :size="14" class="transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === link.slug }" />
            </div>

            <!-- Dropdown Panel -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="activeDropdown === link.slug"
                class="absolute top-full left-0 w-[280px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 z-50 mt-1"
              >
                <div class="flex flex-col gap-1">
                  <div class="mb-3 pb-2 border-b border-gray-50 flex items-center gap-3">
                    <div class="p-2 bg-axius-blue/10 rounded-lg text-axius-blue">
                      <component :is="getIcon(categories.find(c => c.slug === link.slug)?.icon || '')" :size="18" />
                    </div>
                    <span class="text-gray-900 font-black uppercase tracking-wider text-[11px]">Популярное</span>
                  </div>
                  <router-link 
                    v-for="sub in categories.find(c => c.slug === link.slug)?.subcategories" 
                    :key="sub"
                    :to="'/catalog/' + link.slug"
                    class="py-2 px-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-axius-blue transition-all flex items-center justify-between group/item"
                  >
                    {{ sub }}
                    <span class="opacity-0 group-hover/item:opacity-100 transition-opacity text-[10px] font-bold">→</span>
                  </router-link>
                  <router-link 
                    :to="'/catalog/' + link.slug"
                    class="mt-2 py-2 px-3 text-center bg-gray-50 rounded-xl text-axius-blue text-xs font-bold hover:bg-axius-blue hover:text-white transition-all"
                  >
                    Смотреть всё
                  </router-link>
                </div>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <LoginModal :is-open="isLoginOpen" @close="isLoginOpen = false" />
  <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
