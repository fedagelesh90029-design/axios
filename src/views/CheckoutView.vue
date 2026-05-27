<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShoppingBag, Truck, Store, CreditCard, ChevronLeft, Trash2, Info } from 'lucide-vue-next'
import { cart } from '../data/mock'

// State
const deliveryMethod = ref<'pickup' | 'delivery'>('delivery')
const paymentMethod = ref<'cash' | 'invoice'>('cash')

const formData = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  comment: '',
  companyName: '',
  inn: ''
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

// Simulated delivery cost calculation
const deliveryCost = computed(() => {
  if (deliveryMethod.value === 'pickup') return 0
  if (cart.totalPrice.value > 50000) return 0
  return 500
})

const finalTotal = computed(() => cart.totalPrice.value + deliveryCost.value)

// Total weight simulation (kg)
const totalWeight = computed(() => cart.totalCount.value * 15) // Average 15kg per item for building materials
</script>

<template>
  <div class="bg-gray-50 min-h-screen pb-20 pt-10">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <router-link to="/catalog" class="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-istok-blue transition-colors">
          <ChevronLeft :size="20" />
        </router-link>
        <h1 class="text-3xl font-black text-gray-900">Оформление заказа</h1>
      </div>

      <div v-if="cart.items.length === 0" class="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
        <ShoppingBag :size="80" class="mx-auto text-gray-200 mb-6" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h2>
        <p class="text-gray-500 mb-8">Для оформления заказа добавьте товары из каталога</p>
        <router-link to="/catalog" class="bg-istok-blue text-white px-10 py-4 rounded-xl font-bold hover:bg-istok-dark-blue transition-all shadow-lg shadow-istok-blue/20 inline-block">
          Перейти в каталог
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Order Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 1. Cart Items Summary -->
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span class="w-8 h-8 bg-istok-blue text-white rounded-full flex items-center justify-center text-sm">1</span>
              Состав заказа
            </h2>
            <div class="divide-y divide-gray-50">
              <div v-for="item in cart.items" :key="item.id" class="py-4 flex gap-4">
                <div class="w-20 h-20 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-contain">
                </div>
                <div class="flex-grow">
                  <h4 class="text-sm font-bold text-gray-800 line-clamp-1 mb-1">{{ item.name }}</h4>
                  <div class="flex justify-between items-center">
                    <div class="text-xs text-gray-400">Кол-во: {{ item.quantity }} шт.</div>
                    <div class="font-black text-gray-900">{{ formatPrice(item.price * item.quantity) }}</div>
                  </div>
                </div>
                <button @click="cart.removeItem(item.id)" class="text-gray-300 hover:text-istok-red transition-colors">
                  <Trash2 :size="18" />
                </button>
              </div>
            </div>
          </div>

          <!-- 2. Delivery Method -->
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span class="w-8 h-8 bg-istok-blue text-white rounded-full flex items-center justify-center text-sm">2</span>
              Способ получения
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button 
                @click="deliveryMethod = 'delivery'"
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left"
                :class="deliveryMethod === 'delivery' ? 'border-istok-blue bg-istok-blue/[0.02]' : 'border-gray-100 hover:border-gray-200'"
              >
                <div class="p-3 bg-gray-50 rounded-xl" :class="{ 'text-istok-blue bg-istok-blue/10': deliveryMethod === 'delivery' }">
                  <Truck :size="24" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">Доставка</div>
                  <div class="text-xs text-gray-500">До объекта (Адлер и Сочи)</div>
                </div>
              </button>
              <button 
                @click="deliveryMethod = 'pickup'"
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left"
                :class="deliveryMethod === 'pickup' ? 'border-istok-blue bg-istok-blue/[0.02]' : 'border-gray-100 hover:border-gray-200'"
              >
                <div class="p-3 bg-gray-50 rounded-xl" :class="{ 'text-istok-blue bg-istok-blue/10': deliveryMethod === 'pickup' }">
                  <Store :size="24" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">Самовывоз</div>
                  <div class="text-xs text-gray-500">Из магазина базы ИСТОК</div>
                </div>
              </button>
            </div>

            <div v-if="deliveryMethod === 'delivery'" class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Адрес доставки</label>
                <input v-model="formData.address" type="text" placeholder="г. Сочи, ул. Мира, д. 1" class="w-full bg-gray-50 border-none rounded-xl py-4 px-6 focus:ring-1 focus:ring-istok-blue transition-all">
              </div>
              <div class="p-4 bg-amber-50 rounded-xl flex gap-3 text-amber-700 text-sm">
                <Info :size="20" class="flex-shrink-0" />
                <p>При заказе на сумму более 50 000 ₽ доставка по Адлерскому району осуществляется <b>бесплатно</b>.</p>
              </div>
            </div>
          </div>

          <!-- 3. Payment Method -->
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span class="w-8 h-8 bg-istok-blue text-white rounded-full flex items-center justify-center text-sm">3</span>
              Способ оплаты
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                @click="paymentMethod = 'cash'"
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left"
                :class="paymentMethod === 'cash' ? 'border-istok-blue bg-istok-blue/[0.02]' : 'border-gray-100 hover:border-gray-200'"
              >
                <div class="p-3 bg-gray-50 rounded-xl" :class="{ 'text-istok-blue bg-istok-blue/10': paymentMethod === 'cash' }">
                  <CreditCard :size="24" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">При получении</div>
                  <div class="text-xs text-gray-500">Наличные или карта</div>
                </div>
              </button>
              <button 
                @click="paymentMethod = 'invoice'"
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left"
                :class="paymentMethod === 'invoice' ? 'border-istok-blue bg-istok-blue/[0.02]' : 'border-gray-100 hover:border-gray-200'"
              >
                <div class="p-3 bg-gray-50 rounded-xl" :class="{ 'text-istok-blue bg-istok-blue/10': paymentMethod === 'invoice' }">
                  <Store :size="24" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">Безналичный расчет</div>
                  <div class="text-xs text-gray-500">Выставление счета (для Юрлиц)</div>
                </div>
              </button>
            </div>

            <div v-if="paymentMethod === 'invoice'" class="mt-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Название компании</label>
                  <input v-model="formData.companyName" type="text" class="w-full bg-gray-50 border-none rounded-xl py-4 px-6 focus:ring-1 focus:ring-istok-blue transition-all">
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">ИНН</label>
                  <input v-model="formData.inn" type="text" class="w-full bg-gray-50 border-none rounded-xl py-4 px-6 focus:ring-1 focus:ring-istok-blue transition-all">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <aside class="space-y-6">
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-40">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Ваш заказ</h3>
            
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-500 font-medium">
                <span>Товары ({{ cart.totalCount.value }})</span>
                <span>{{ formatPrice(cart.totalPrice.value) }}</span>
              </div>
              <div class="flex justify-between text-gray-500 font-medium">
                <span>Вес заказа (прим.)</span>
                <span>~{{ totalWeight }} кг</span>
              </div>
              <div class="flex justify-between text-gray-500 font-medium">
                <span>Доставка</span>
                <span v-if="deliveryCost === 0" class="text-emerald-600">Бесплатно</span>
                <span v-else>{{ formatPrice(deliveryCost) }}</span>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-6 mb-8">
              <div class="flex justify-between items-end">
                <span class="text-gray-900 font-bold">Итого к оплате</span>
                <span class="text-3xl font-black text-istok-blue leading-none">{{ formatPrice(finalTotal) }}</span>
              </div>
            </div>

            <div class="space-y-4 mb-8">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Контактный телефон</label>
                <input v-model="formData.phone" type="tel" placeholder="+7 (___) ___-__-__" class="w-full bg-gray-50 border-none rounded-xl py-4 px-6 focus:ring-1 focus:ring-istok-blue transition-all font-bold">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Имя</label>
                <input v-model="formData.name" type="text" placeholder="Иван Иванов" class="w-full bg-gray-50 border-none rounded-xl py-4 px-6 focus:ring-1 focus:ring-istok-blue transition-all font-bold">
              </div>
            </div>

            <button class="w-full bg-istok-blue text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-istok-blue/30 hover:bg-istok-dark-blue hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-wider">
              Оформить заказ
            </button>
            
            <p class="text-[10px] text-gray-400 text-center mt-6 leading-relaxed">
              Нажимая кнопку, вы соглашаетесь с <a href="#" class="underline">политикой конфиденциальности</a> и <a href="#" class="underline">условиями оферты</a>.
            </p>
          </div>

          <div class="bg-istok-blue/5 rounded-3xl p-6 border border-istok-blue/10">
            <h4 class="font-bold text-istok-blue mb-2 flex items-center gap-2">
              <Info :size="18" />
              Нужна помощь?
            </h4>
            <p class="text-xs text-gray-600 leading-relaxed">
              Наш менеджер поможет подобрать транспорт и рассчитать точную стоимость доставки для крупных партий.
            </p>
            <a href="tel:+78622000000" class="text-sm font-bold text-istok-blue mt-3 block">+7 (862) 200-00-00</a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
