<script setup lang="ts">
import { Star, ShoppingCart } from 'lucide-vue-next'
import { cart, type Product } from '../../data/mock'

const props = defineProps<{
  product: Product
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

const addToCart = () => {
  cart.addItem(props.product)
}
</script>

<template>
  <div class="group bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative flex flex-col h-full">
    <!-- Badges -->
    <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
      <span v-if="product.badge" :class="[product.badgeColor, 'text-[10px] font-bold text-white px-2.5 py-1 rounded-md shadow-sm']">
        {{ product.badge }}
      </span>
      <span v-if="product.discount" class="bg-istok-red text-[10px] font-bold text-white px-2.5 py-1 rounded-md shadow-sm">
        {{ product.discount }}
      </span>
    </div>

    <!-- Image -->
    <router-link :to="'/product/' + product.id" class="mb-5 overflow-hidden rounded-xl h-48 flex items-center justify-center bg-gray-50 group-hover:bg-white transition-colors cursor-pointer">
      <img :src="product.image" :alt="product.name" class="max-h-[80%] max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-500">
    </router-link>

    <!-- Rating -->
    <div class="flex items-center gap-1.5 mb-2.5">
      <div class="flex text-amber-400">
        <Star v-for="i in 5" :key="i" :size="14" :fill="i <= Math.floor(product.rating) ? 'currentColor' : 'none'" :stroke-width="2" />
      </div>
      <span class="text-[12px] font-medium text-gray-400">({{ product.reviews }})</span>
    </div>

    <!-- Name -->
    <router-link :to="'/product/' + product.id" class="text-sm font-bold text-gray-800 mb-4 line-clamp-2 flex-grow hover:text-istok-blue cursor-pointer transition-colors leading-relaxed">
      {{ product.name }}
    </router-link>

    <!-- Price -->
    <div class="mb-5">
      <div class="flex items-baseline gap-2.5">
        <span class="text-xl font-black text-gray-900">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="text-sm text-gray-400 line-through font-medium">{{ formatPrice(product.oldPrice) }}</span>
      </div>
      <p class="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        В наличии
      </p>
    </div>

    <!-- Action -->
    <button 
      @click="addToCart"
      class="w-full bg-istok-blue text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 hover:bg-istok-dark-blue active:scale-95 transition-all shadow-lg shadow-istok-blue/20"
    >
      <ShoppingCart :size="18" />
      В корзину
    </button>
  </div>
</template>
