<script setup lang="ts">
import * as LucideIcons from 'lucide-vue-next'
import { categories } from '../../data/mock'

const getIcon = (name: string) => {
  return (LucideIcons as any)[name]
}
</script>

<template>
  <section class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="cat in categories" 
        :key="cat.id" 
        class="group relative bg-white border border-gray-100 rounded-3xl p-8 flex flex-col h-[200px] overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 hover:border-istok-blue transition-all duration-500 cursor-pointer"
      >
        <!-- Content Container (Visible by default) -->
        <div class="flex flex-col h-full transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
          <div class="bg-gray-50 p-4 rounded-2xl w-fit group-hover:bg-istok-blue group-hover:text-white transition-colors duration-500 mb-6">
            <component :is="getIcon(cat.icon)" :size="32" class="text-istok-blue group-hover:text-white transition-colors" />
          </div>
          <span class="text-xl font-black text-gray-900">{{ cat.name }}</span>
        </div>

        <!-- Hover Overlay (Revealed on hover) -->
        <div class="absolute inset-0 p-8 bg-white flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-2 border-istok-blue rounded-3xl">
          <div>
            <h4 class="text-sm font-black text-istok-blue uppercase tracking-widest mb-4">{{ cat.name }}</h4>
            <ul class="space-y-2">
              <li v-for="sub in cat.subcategories" :key="sub">
                <router-link :to="'/catalog/' + cat.slug" class="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
                  <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                  {{ sub }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-link :to="'/catalog/' + cat.slug" class="text-xs font-black text-gray-900 flex items-center gap-2 group/btn">
            Смотреть все
            <div class="p-1.5 bg-gray-50 rounded-lg group-hover/btn:bg-istok-blue group-hover/btn:text-white transition-colors">
              <LucideIcons.ArrowRight :size="12" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Removed the bug-causing opacity style */
</style>
