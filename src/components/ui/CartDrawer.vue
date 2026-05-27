<script setup lang="ts">
import { X, Trash2, ShoppingBag } from 'lucide-vue-next'
import { cart } from '../../data/mock'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
</script>

<template>
  <Transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="emit('close')"></div>
      
      <!-- Drawer Content -->
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag :size="24" class="text-istok-blue" />
            Корзина
            <span class="bg-istok-blue/10 text-istok-blue px-2 py-0.5 rounded text-sm">{{ cart.totalCount.value }}</span>
          </h2>
          <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X :size="24" />
          </button>
        </div>

        <div class="flex-grow overflow-y-auto p-6 space-y-6">
          <div v-if="cart.items.length === 0" class="h-full flex flex-col items-center justify-center text-center opacity-40">
            <ShoppingBag :size="64" class="mb-4" />
            <p class="text-lg font-medium">Ваша корзина пуста</p>
            <p class="text-sm">Добавьте что-нибудь из каталога</p>
          </div>

          <div v-for="item in cart.items" :key="item.id" class="flex gap-4 group">
            <div class="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 p-2 border border-gray-100">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-contain">
            </div>
            <div class="flex-grow">
              <h4 class="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-istok-blue transition-colors cursor-pointer">{{ item.name }}</h4>
              <div class="flex justify-between items-center">
                <div class="text-sm">
                  <span class="font-bold text-gray-900">{{ formatPrice(item.price) }}</span>
                  <span class="text-gray-400 mx-2">×</span>
                  <span class="text-gray-600">{{ item.quantity }} шт.</span>
                </div>
                <button @click="cart.removeItem(item.id)" class="text-gray-300 hover:text-istok-red transition-colors p-1">
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="cart.items.length > 0" class="p-6 border-t border-gray-100 bg-gray-50">
          <div class="flex justify-between items-center mb-6">
            <span class="text-gray-500 font-medium">Итого к оплате</span>
            <span class="text-2xl font-black text-gray-900">{{ formatPrice(cart.totalPrice.value) }}</span>
          </div>
          <button class="w-full bg-istok-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-istok-dark-blue transition-all shadow-lg shadow-istok-blue/20">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
