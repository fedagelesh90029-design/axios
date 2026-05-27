<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Banner: Makita Sale -->
      <div class="lg:col-span-2 relative bg-slate-900 rounded-3xl overflow-hidden h-[450px] flex items-center px-12 group cursor-pointer shadow-xl">
        <div class="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1572910358198-273228d3a2a4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        <div class="relative z-10 text-white max-w-lg">
          <div class="flex items-center gap-3 mb-6">
            <span class="bg-axius-blue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">Makita Pro</span>
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Спецпредложение</span>
          </div>
          <h2 class="text-5xl font-black mb-6 leading-tight">Неделя профессионального инструмента Makita</h2>
          <p class="text-lg text-slate-300 mb-8 font-medium">Скидки до 35% на аккумуляторные серии LXT и XGT. Успейте обновить арсенал!</p>
          <router-link to="/catalog/tools" class="bg-axius-blue text-white px-10 py-4 rounded-xl font-black hover:bg-axius-dark-blue transition-all shadow-lg shadow-axius-blue/30 inline-block uppercase tracking-wider text-sm">
            Смотреть акцию
          </router-link>
        </div>
      </div>

      <!-- Side Banners -->
      <div class="flex flex-col gap-6 h-[450px]">
        <!-- Banner 1: Delivery -->
        <div class="flex-1 bg-white rounded-3xl p-8 flex flex-col justify-between group cursor-pointer border border-gray-100 shadow-lg hover:border-axius-blue transition-all relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-axius-blue"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          </div>
          <div class="relative z-10">
            <span class="text-[10px] font-black uppercase text-axius-blue mb-3 block tracking-widest">Логистика</span>
            <h3 class="text-2xl font-black text-gray-900 mb-2 leading-tight">Доставка стройматериалов</h3>
            <p class="text-sm text-gray-500 font-medium">Бесплатная доставка по Адлерскому району при заказе от 50 000 ₽.</p>
          </div>
          <router-link to="/catalog" class="text-axius-blue text-sm font-black hover:underline flex items-center gap-2 relative z-10">
            Подробнее
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </router-link>
        </div>
        
        <!-- Banner 2: VIP / B2B -->
        <div class="flex-1 bg-axius-blue rounded-3xl p-8 flex flex-col justify-between group cursor-pointer shadow-lg shadow-axius-blue/20 transition-all relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div class="relative z-10 text-white">
            <span class="text-[10px] font-black uppercase mb-3 block tracking-widest opacity-70">Партнерство</span>
            <h3 class="text-2xl font-black mb-2 leading-tight">Для прорабов и компаний</h3>
            <p class="text-sm opacity-90 font-medium">Спеццены, персональный менеджер и отсрочка платежа для постоянных клиентов.</p>
          </div>
          <a href="#" class="text-white text-sm font-black hover:underline flex items-center gap-2 relative z-10">
            Стать партнером
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

