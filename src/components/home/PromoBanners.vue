<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Banner: Knauf Plasterboard -->
      <div class="relative bg-white rounded-3xl overflow-hidden h-[300px] flex items-center px-12 group cursor-pointer border border-gray-100 shadow-xl">
        <div class="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div>
        <div class="relative z-10 max-w-sm">
          <span class="text-[10px] font-black uppercase text-istok-blue mb-3 block tracking-widest">В наличии на базе</span>
          <h3 class="text-3xl font-black text-gray-900 mb-6 leading-tight">Гипсокартон Knauf и комплектующие</h3>
          <p class="text-gray-500 mb-8 font-medium">Весь ассортимент ГКЛ, профилей и смесей в одном месте. Отгрузка за 30 минут!</p>
          <router-link to="/catalog" class="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg">
            Перейти к выбору
          </router-link>
        </div>
      </div>

      <!-- Banner: Painting Equipment Rental -->
      <div class="relative bg-slate-900 rounded-3xl overflow-hidden h-[300px] flex items-center px-12 group cursor-pointer shadow-xl">
        <div class="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        <div class="relative z-10 text-white max-w-sm">
          <span class="text-[10px] font-black uppercase text-amber-400 mb-3 block tracking-widest">Прокат инструмента</span>
          <h3 class="text-3xl font-black mb-6 leading-tight">Безвоздушная окраска Profinstrument</h3>
          <p class="text-slate-300 mb-8 font-medium">Аренда профессиональных окрасочных аппаратов. Идеально для больших площадей.</p>
          <button class="bg-amber-400 text-slate-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-amber-500 transition-colors">
            Забронировать
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
