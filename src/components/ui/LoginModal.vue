<script setup lang="ts">
import { X, Mail, Lock, Github } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="p-8">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900">Вход в личный кабинет</h2>
            <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
              <X :size="24" />
            </button>
          </div>

          <form @submit.prevent class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email или телефон</label>
              <div class="relative">
                <input 
                  type="text" 
                  class="w-full border border-gray-300 rounded-lg py-3 px-4 pl-12 focus:border-axius-blue focus:ring-1 focus:ring-axius-blue transition-all"
                  placeholder="example@mail.ru"
                >
                <Mail class="absolute left-4 top-3.5 text-gray-400" :size="20" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <div class="relative">
                <input 
                  type="password" 
                  class="w-full border border-gray-300 rounded-lg py-3 px-4 pl-12 focus:border-axius-blue focus:ring-1 focus:ring-axius-blue transition-all"
                  placeholder="••••••••"
                >
                <Lock class="absolute left-4 top-3.5 text-gray-400" :size="20" />
              </div>
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="rounded text-axius-blue focus:ring-axius-blue">
                <span class="text-gray-600">Запомнить меня</span>
              </label>
              <a href="#" class="text-axius-blue hover:underline font-medium">Забыли пароль?</a>
            </div>

            <button class="w-full bg-axius-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-axius-dark-blue transition-all shadow-lg shadow-axius-blue/20">
              Войти
            </button>
          </form>

          <div class="mt-8">
            <div class="relative flex items-center justify-center mb-6">
              <div class="border-t border-gray-200 w-full"></div>
              <span class="bg-white px-4 text-xs text-gray-400 uppercase tracking-widest absolute">Или через</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button class="flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-600">
                <Github :size="20" />
                GitHub
              </button>
              <button class="flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-600">
                <img src="https://www.google.com/favicon.ico" class="w-5 h-5" alt="Google">
                Google
              </button>
            </div>
          </div>

          <p class="mt-8 text-center text-sm text-gray-500">
            Нет аккаунта? 
            <a href="#" class="text-axius-blue font-bold hover:underline">Зарегистрироваться</a>
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

