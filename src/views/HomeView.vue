<script setup lang="ts">
import HeroBanners from '../components/home/HeroBanners.vue'
import CategoryGrid from '../components/home/CategoryGrid.vue'
import ProductSection from '../components/home/ProductSection.vue'
import PromoBanners from '../components/home/PromoBanners.vue'
</script>

<template>
  <div>
    <HeroBanners />
    <CategoryGrid />
    <ProductSection title="Популярные товары" />
    <PromoBanners />
    <ProductSection title="Новинки" />
  </div>
</template>
