<script setup lang="ts">
import { Phone, Mail, MapPin } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-axius-dark-blue text-white pt-16 pb-8 px-4 mt-auto">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Company -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider mb-6 opacity-60">Компания</h3>
          <ul class="space-y-4 text-sm">
            <li><a href="#" class="hover:underline">О нас</a></li>
            <li><a href="#" class="hover:underline">Контакты</a></li>
            <li><a href="#" class="hover:underline">Вакансии</a></li>
            <li><a href="#" class="hover:underline">Партнёрам</a></li>
          </ul>
        </div>

        <!-- For Buyers -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider mb-6 opacity-60">Покупателям</h3>
          <ul class="space-y-4 text-sm">
            <li><a href="#" class="hover:underline">Доставка и оплата</a></li>
            <li><a href="#" class="hover:underline">Гарантия</a></li>
            <li><a href="#" class="hover:underline">Возврат товара</a></li>
            <li><a href="#" class="hover:underline">Кредит</a></li>
          </ul>
        </div>

        <!-- Catalog -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider mb-6 opacity-60">Каталог</h3>
          <ul class="space-y-4 text-sm">
            <li><a href="#" class="hover:underline">Инструменты</a></li>
            <li><a href="#" class="hover:underline">Крепёж</a></li>
            <li><a href="#" class="hover:underline">Электрика</a></li>
            <li><a href="#" class="hover:underline">Сантехника</a></li>
          </ul>
        </div>

        <!-- Contacts -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider mb-6 opacity-60">Контакты</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-center gap-3">
              <Phone :size="18" class="text-white opacity-80" />
              <a href="tel:+78622000000" class="hover:underline">+7 (862) 200-00-00</a>
            </li>
            <li class="flex items-center gap-3">
              <Mail :size="18" class="text-white opacity-80" />
              <a href="mailto:info@axius-shop.ru" class="hover:underline">info@axius-shop.ru</a>
            </li>
            <li class="flex items-center gap-3">
              <MapPin :size="18" class="text-white opacity-80" />
              <span>г. Сочи, Россия</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
        <p>© 2026 АКСИУС. Все права защищены.</p>
        <div class="flex gap-8">
          <a href="#" class="hover:underline">Политика конфиденциальности</a>
          <a href="#" class="hover:underline">Условия использования</a>
        </div>
      </div>
    </div>
  </footer>
</template>

