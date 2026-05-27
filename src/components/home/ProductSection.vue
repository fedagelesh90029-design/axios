<script setup lang="ts">
import ProductCard from '../ui/ProductCard.vue'
import { products } from '../../data/mock'

defineProps<{
  title: string
}>()
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-end mb-8">
      <h2 class="text-3xl font-bold text-gray-900">{{ title }}</h2>
      <a href="#" class="text-istok-blue font-medium hover:underline text-sm">Смотреть все</a>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
