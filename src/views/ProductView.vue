<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Star, 
  ShoppingCart, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageCircle,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-vue-next'
import { products, cart, type Product } from '../data/mock'

const route = useRoute()

// State
const product = ref<Product | null>(null)
const quantity = ref(1)
const activeTab = ref('description')
const isAdded = ref(false)
const showOneClickModal = ref(false)

onMounted(() => {
  const id = Number(route.params.id)
  product.value = products.find(p => p.id === id) || null
})

// Calculations
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

const addToCart = () => {
  if (product.value) {
    cart.addItem(product.value, quantity.value)
    isAdded.value = true
    setTimeout(() => { isAdded.value = false }, 2000)
  }
}

// Unit handling for materials (e.g., tiles)
const m2Value = ref(0)
const packsValue = ref(0)

const updateFromM2 = () => {
  if (product.value?.packSize) {
    packsValue.value = Math.ceil(m2Value.value / product.value.packSize)
    quantity.value = packsValue.value
  }
}

const updateFromPacks = () => {
  if (product.value?.packSize) {
    m2Value.value = Number((quantity.value * product.value.packSize).toFixed(2))
  }
}
</script>

<template>
  <div v-if="product" class="bg-white min-h-screen pb-20 pt-6">
    <!-- Breadcrumbs -->
    <div class="container mx-auto px-4 mb-10">
      <nav class="flex items-center gap-2 text-sm text-gray-400 font-medium">
        <router-link to="/" class="hover:text-istok-blue transition-colors">Главная</router-link>
        <ChevronRight :size="14" />
        <router-link to="/catalog" class="hover:text-istok-blue transition-colors">Каталог</router-link>
        <ChevronRight :size="14" />
        <span class="text-gray-900 line-clamp-1">{{ product.name }}</span>
      </nav>
    </div>

    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <!-- Image Gallery -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-3xl p-10 flex items-center justify-center border border-gray-100 aspect-square overflow-hidden group">
            <img :src="product.image" :alt="product.name" class="max-h-full object-contain group-hover:scale-110 transition-transform duration-700">
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="aspect-square bg-gray-50 rounded-xl border border-gray-100 p-2 cursor-pointer hover:border-istok-blue transition-colors">
              <img :src="product.image" class="w-full h-full object-contain opacity-50 hover:opacity-100 transition-opacity">
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col">
          <div class="mb-8">
            <div class="flex items-center gap-4 mb-4">
              <span v-if="product.badge" :class="[product.badgeColor, 'text-xs font-bold text-white px-3 py-1 rounded-md shadow-sm']">
                {{ product.badge }}
              </span>
              <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Артикул: {{ 1000 + product.id }}</span>
            </div>
            <h1 class="text-4xl font-black text-gray-900 leading-tight mb-4">{{ product.name }}</h1>
            
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-1.5">
                <div class="flex text-amber-400">
                  <Star v-for="i in 5" :key="i" :size="18" :fill="i <= Math.floor(product.rating) ? 'currentColor' : 'none'" />
                </div>
                <span class="text-sm font-bold text-gray-900">{{ product.rating }}</span>
                <span class="text-sm font-medium text-gray-400">({{ product.reviews }} отзывов)</span>
              </div>
              <div class="w-px h-4 bg-gray-200"></div>
              <span class="text-emerald-600 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 :size="18" />
                В наличии в Адлере
              </span>
            </div>
          </div>

          <!-- Price and Action -->
          <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-8">
            <div class="flex items-baseline gap-4 mb-6">
              <span class="text-5xl font-black text-gray-900">{{ formatPrice(product.price) }}</span>
              <span v-if="product.oldPrice" class="text-xl text-gray-400 line-through font-medium">{{ formatPrice(product.oldPrice) }}</span>
              <span class="text-gray-400 font-bold text-lg">/ {{ product.unit }}</span>
            </div>

            <!-- Unit Calculator for materials -->
            <div v-if="product.packSize" class="grid grid-cols-2 gap-4 mb-8">
              <div class="bg-white rounded-xl p-4 border border-gray-200">
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Количество, м²</label>
                <input v-model="m2Value" @input="updateFromM2" type="number" step="0.01" class="w-full font-black text-xl bg-transparent outline-none">
              </div>
              <div class="bg-white rounded-xl p-4 border border-gray-200">
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Упаковок, шт</label>
                <input v-model="quantity" @input="updateFromPacks" type="number" class="w-full font-black text-xl bg-transparent outline-none">
              </div>
            </div>

            <!-- Standard Counter -->
            <div v-else class="flex items-center gap-4 mb-8">
              <div class="flex items-center bg-white rounded-xl border border-gray-200 p-1">
                <button @click="quantity > 1 && quantity--" class="p-3 text-gray-400 hover:text-istok-blue transition-colors">
                  <Minus :size="20" />
                </button>
                <input v-model="quantity" type="number" class="w-16 text-center font-black text-xl outline-none">
                <button @click="quantity++" class="p-3 text-gray-400 hover:text-istok-blue transition-colors">
                  <Plus :size="20" />
                </button>
              </div>
              <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">штуки</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="addToCart"
                class="flex-grow bg-istok-blue text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-istok-blue/30 hover:bg-istok-dark-blue active:scale-95 transition-all"
              >
                <ShoppingCart v-if="!isAdded" :size="24" />
                <CheckCircle2 v-else :size="24" />
                {{ isAdded ? 'Добавлено!' : 'В корзину' }}
              </button>
              <button 
                @click="showOneClickModal = true"
                class="bg-white text-gray-900 border-2 border-gray-200 py-5 px-8 rounded-2xl font-black text-lg hover:border-istok-blue hover:text-istok-blue transition-all"
              >
                Купить в 1 клик
              </button>
            </div>
          </div>

          <!-- Benefits -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
              <div class="p-2 bg-gray-50 rounded-lg"><Truck :size="20" class="text-istok-blue" /></div>
              Доставка сегодня
            </div>
            <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
              <div class="p-2 bg-gray-50 rounded-lg"><ShieldCheck :size="20" class="text-istok-blue" /></div>
              Гарантия 12 мес.
            </div>
            <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
              <div class="p-2 bg-gray-50 rounded-lg"><RotateCcw :size="20" class="text-istok-blue" /></div>
              Возврат 30 дней
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-100 flex gap-12 mb-10 overflow-x-auto whitespace-nowrap">
        <button 
          @click="activeTab = 'description'"
          class="pb-4 text-lg font-bold transition-all border-b-2"
          :class="activeTab === 'description' ? 'border-istok-blue text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'"
        >
          Описание
        </button>
        <button 
          @click="activeTab = 'specs'"
          class="pb-4 text-lg font-bold transition-all border-b-2"
          :class="activeTab === 'specs' ? 'border-istok-blue text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'"
        >
          Характеристики
        </button>
        <button 
          @click="activeTab = 'reviews'"
          class="pb-4 text-lg font-bold transition-all border-b-2"
          :class="activeTab === 'reviews' ? 'border-istok-blue text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'"
        >
          Отзывы ({{ product.reviews }})
        </button>
      </div>

      <!-- Tab Content -->
      <div class="max-w-4xl leading-relaxed text-gray-600">
        <div v-if="activeTab === 'description'" class="animate-in fade-in slide-in-from-bottom-2">
          <p class="text-lg">{{ product.description }}</p>
          <p class="mt-6">Надежный выбор для профессионалов и домашних мастеров. Продукция компании {{ product.brand }} отличается высоким качеством и долговечностью.</p>
        </div>
        
        <div v-if="activeTab === 'specs'" class="animate-in fade-in slide-in-from-bottom-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
            <div v-for="(value, key) in product.specs" :key="key" class="flex justify-between border-b border-gray-50 pb-2">
              <span class="text-gray-400 font-medium">{{ key }}</span>
              <span class="text-gray-900 font-bold">{{ value }}</span>
            </div>
            <div class="flex justify-between border-b border-gray-50 pb-2">
              <span class="text-gray-400 font-medium">Бренд</span>
              <span class="text-gray-900 font-bold">{{ product.brand }}</span>
            </div>
            <div class="flex justify-between border-b border-gray-50 pb-2">
              <span class="text-gray-400 font-medium">Страна бренда</span>
              <span class="text-gray-900 font-bold">Япония</span>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'reviews'" class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <MessageCircle :size="48" class="mx-auto text-gray-200 mb-4" />
          <h3 class="text-xl font-bold text-gray-900">Пока нет отзывов</h3>
          <p class="text-gray-500 mt-2">Станьте первым, кто оценит этот товар!</p>
          <button class="mt-8 text-istok-blue font-bold border-b-2 border-istok-blue">Оставить отзыв</button>
        </div>
      </div>
    </div>

    <!-- One-Click Order Modal (Stub) -->
    <div v-if="showOneClickModal" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button @click="showOneClickModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
          <Plus :size="24" class="rotate-45" />
        </button>
        <h2 class="text-2xl font-black text-gray-900 mb-6">Заказать в 1 клик</h2>
        <p class="text-sm text-gray-500 mb-8">Оставьте ваш номер телефона, и наш менеджер свяжется с вами в течение 10 минут для оформления заказа.</p>
        <form @submit.prevent class="space-y-6">
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Номер телефона</label>
            <input type="tel" placeholder="+7 (___) ___-__-__" class="w-full bg-gray-50 border-none rounded-xl py-4 px-6 focus:ring-1 focus:ring-istok-blue transition-all font-bold">
          </div>
          <button class="w-full bg-istok-blue text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-istok-blue/30 hover:bg-istok-dark-blue transition-all">
            Жду звонка
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
