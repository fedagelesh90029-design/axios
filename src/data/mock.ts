import { reactive, computed } from 'vue'

// Import local images
import makitaImg from '../assets/products/makita-drill.jpg'
import tileImg from '../assets/products/tile.jpg'
import boschImg from '../assets/products/bosch-hammer.jpg'

export interface Category {
  id: number
  name: string
  icon: string
  slug: string
  subcategories: string[]
}

export interface NavLink {
  name: string
  slug: string
}

export interface Product {
  id: number
  name: string
  price: number
  oldPrice: number | null
  rating: number
  reviews: number
  badge: string | null
  badgeColor?: string | null
  discount: string | null
  image: string
  categorySlug: string
  brand: string
  unit: 'шт' | 'м²' | 'уп'
  packSize?: number
  description: string
  specs: Record<string, string>
}

export interface CartItem extends Product {
  quantity: number
  selectedUnit: string
}

export const categories: Category[] = [
  { 
    id: 1, 
    name: 'Инструменты', 
    icon: 'Wrench', 
    slug: 'tools',
    subcategories: ['Электроинструмент', 'Ручной инструмент', 'Пневматика', 'Оснастка']
  },
  { 
    id: 2, 
    name: 'Крепёж', 
    icon: 'Nut', 
    slug: 'fasteners',
    subcategories: ['Саморезы', 'Дюбели', 'Анкеры', 'Метрический крепёж']
  },
  { 
    id: 3, 
    name: 'Электрика', 
    icon: 'Zap', 
    slug: 'electrical',
    subcategories: ['Кабель и провод', 'Автоматика', 'Розетки и выключатели', 'Освещение']
  },
  { 
    id: 4, 
    name: 'Сантехника', 
    icon: 'Droplets', 
    slug: 'plumbing',
    subcategories: ['Трубы и фитинги', 'Инсталляции', 'Смесители', 'Отопление']
  },
  { 
    id: 5, 
    name: 'Краски', 
    icon: 'Palette', 
    slug: 'paints',
    subcategories: ['Интерьерные краски', 'Эмали', 'Лаки', 'Грунтовки']
  },
  { 
    id: 6, 
    name: 'Материалы', 
    icon: 'Box', 
    slug: 'materials',
    subcategories: ['Гипсокартон', 'Сухие смеси', 'Изоляция', 'Пиломатериалы']
  },
  { 
    id: 7, 
    name: 'Спецодежда', 
    icon: 'HardHat', 
    slug: 'clothing',
    subcategories: ['Рабочая одежда', 'Обувь', 'Средства защиты', 'Перчатки']
  },
  { 
    id: 8, 
    name: 'Измерения', 
    icon: 'Ruler', 
    slug: 'measuring',
    subcategories: ['Лазерные уровни', 'Рулетки', 'Нивелиры', 'Детекторы']
  },
]

export const navLinks: NavLink[] = [
  { name: 'Инструменты', slug: 'tools' },
  { name: 'Крепёж', slug: 'fasteners' },
  { name: 'Электрика', slug: 'electrical' },
  { name: 'Сантехника', slug: 'plumbing' },
  { name: 'Лакокрасочные материалы', slug: 'paints' },
  { name: 'Стройматериалы', slug: 'materials' },
  { name: 'Спецодежда', slug: 'clothing' },
  { name: 'Всё для дома', slug: 'home' }
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Дрель-шуруповёрт аккумуляторная Makita 18V LXT DDF485Z',
    price: 12490,
    oldPrice: 15990,
    rating: 4.8,
    reviews: 124,
    badge: 'ХИТ ПРОДАЖ',
    badgeColor: 'bg-istok-blue',
    discount: '-22%',
    image: makitaImg,
    categorySlug: 'tools',
    brand: 'Makita',
    unit: 'шт',
    description: 'Компактная и легкая дрель-шуруповерт с бесщеточным двигателем для продолжительной работы.',
    specs: { 'Напряжение': '18 В', 'Тип двигателя': 'бесщеточный', 'Вес': '1.7 кг' }
  },
  {
    id: 2,
    name: 'Керамогранит Cersanit Wood House коричневый 20x60',
    price: 1250,
    oldPrice: 1450,
    rating: 4.9,
    reviews: 42,
    badge: 'НОВИНКА',
    badgeColor: 'bg-emerald-500',
    discount: '-14%',
    image: tileImg,
    categorySlug: 'materials',
    brand: 'Cersanit',
    unit: 'м²',
    packSize: 1.44,
    description: 'Матовый керамогранит с текстурой дерева.',
    specs: { 'Размер': '20x60 см', 'Толщина': '9 мм', 'В упаковке': '1.44 м²' }
  },
  {
    id: 3,
    name: 'Перфоратор Bosch Professional GBH 2-28 F',
    price: 18990,
    oldPrice: 22990,
    rating: 4.9,
    reviews: 89,
    badge: 'СКИДКА',
    badgeColor: 'bg-istok-blue',
    discount: '-17%',
    image: boschImg,
    categorySlug: 'tools',
    brand: 'Bosch',
    unit: 'шт',
    description: 'Самый мощный перфоратор в своем классе.',
    specs: { 'Энергия удара': '3.2 Дж', 'Мощность': '880 Вт', 'Вес': '3.1 кг' }
  },
  {
    id: 4,
    name: 'Набор инструментов Thorvik UTS0120 120 предметов',
    price: 8490,
    oldPrice: null,
    rating: 4.7,
    reviews: 56,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1530124560676-4fbc91848b9b?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'tools',
    brand: 'Thorvik',
    unit: 'шт',
    description: 'Профессиональный набор инструментов в ударопрочном кейсе.',
    specs: { 'Количество предметов': '120', 'Материал': 'Cr-V сталь' }
  }
]

const cartState = reactive({
  items: [] as CartItem[]
})

export const cart = {
  get items() { return cartState.items },
  addItem(product: Product, quantity: number = 1) {
    const existing = cartState.items.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cartState.items.push({ ...product, quantity, selectedUnit: product.unit })
    }
  },
  removeItem(id: number) {
    cartState.items = cartState.items.filter(i => i.id !== id)
  },
  updateQuantity(id: number, quantity: number) {
    const item = cartState.items.find(i => i.id === id)
    if (item) item.quantity = Math.max(1, quantity)
  },
  totalCount: computed(() => cartState.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)),
  totalPrice: computed(() => cartState.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0))
}
