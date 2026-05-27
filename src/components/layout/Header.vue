<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, User, ShoppingCart, Phone } from 'lucide-vue-next'
import { navLinks, cart } from '../../data/mock'
import LoginModal from '../ui/LoginModal.vue'
import CartDrawer from '../ui/CartDrawer.vue'

const router = useRouter()
const isLoginOpen = ref(false)
const isCartOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'catalog', query: { q: searchQuery.value } })
    searchQuery.value = ''
  }
}
</script>

<template>
  <header class="w-full bg-white shadow-sm z-50">
    <!-- Top Bar -->
    <div class="bg-istok-blue text-white py-2 px-4 text-sm">
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
            <div class="p-3 bg-istok-blue text-white rounded-xl shadow-lg shadow-istok-blue/20 group-hover:bg-istok-dark-blue transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
          </router-link>
        </div>

        <!-- Search Bar -->
        <form @submit.prevent="handleSearch" class="flex-grow max-w-2xl relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Поиск среди 50 000+ товаров..." 
            class="w-full border border-gray-200 rounded-xl py-3 px-5 pr-14 focus:border-istok-blue focus:ring-1 focus:ring-istok-blue transition-all bg-gray-50"
          >
          <button type="submit" class="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-istok-blue text-white rounded-lg hover:bg-istok-dark-blue transition-all shadow-md shadow-istok-blue/20">
            <Search :size="20" />
          </button>
        </form>

        <!-- User Actions -->
        <div class="flex items-center gap-6 text-sm font-bold text-gray-700">
          <button @click="isLoginOpen = true" class="flex items-center gap-2.5 hover:text-istok-blue transition-colors group">
            <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-istok-blue/10 transition-colors">
              <User :size="20" />
            </div>
            Вход
          </button>
          <button @click="isCartOpen = true" class="flex items-center gap-2.5 hover:text-istok-blue transition-colors group relative">
            <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-istok-blue/10 transition-colors">
              <ShoppingCart :size="20" />
            </div>
            Корзина
            <span v-if="cart.totalCount.value > 0" class="absolute top-0 right-0 bg-istok-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white -mt-1 -mr-1">
              {{ cart.totalCount.value }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation (Persistent Sub-Bar) -->
    <nav class="bg-white border-b border-gray-50 overflow-x-auto">
      <div class="container mx-auto px-4">
        <ul class="flex whitespace-nowrap gap-8 py-3.5 text-sm font-bold text-gray-500">
          <li>
            <router-link to="/catalog" class="hover:text-istok-blue transition-colors flex items-center gap-2" active-class="text-istok-blue">
              <span class="w-2 h-2 rounded-full bg-istok-blue"></span>
              Весь каталог
            </router-link>
          </li>
          <li v-for="link in navLinks" :key="link.slug">
            <router-link 
              :to="'/catalog/' + link.slug" 
              class="hover:text-istok-blue transition-colors"
              active-class="text-istok-blue border-b-2 border-istok-blue pb-3.5"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <LoginModal :is-open="isLoginOpen" @close="isLoginOpen = false" />
  <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
</template>
