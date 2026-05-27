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
  // --- ТЕКУЩИЕ ТОВАРЫ ---
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

  // --- ИНСТРУМЕНТЫ ---
  {
    id: 5,
    name: 'Углошлифовальная машина (Болгарка) DeWalt DWE4257',
    price: 14700,
    oldPrice: null,
    rating: 4.7,
    reviews: 35,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'tools',
    brand: 'DeWalt',
    unit: 'шт',
    description: 'Мощная УШМ с регулировкой оборотов и защитой от перегрузок.',
    specs: { 'Мощность': '1500 Вт', 'Диаметр диска': '125 мм', 'Вес': '2.5 кг' }
  },

  // --- КРЕПЕЖ ---
  {
    id: 6,
    name: 'Саморезы по дереву оцинкованные 3.5x35 мм (500 шт)',
    price: 450,
    oldPrice: 600,
    rating: 4.5,
    reviews: 12,
    badge: 'АКЦИЯ',
    badgeColor: 'bg-red-500',
    discount: '-25%',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'fasteners',
    brand: 'Standers',
    unit: 'уп',
    packSize: 500,
    description: 'Универсальные оцинкованные саморезы для деревянных конструкций.',
    specs: { 'Размер': '3.5x35 мм', 'Материал': 'Сталь', 'Покрытие': 'Цинк' }
  },
  {
    id: 7,
    name: 'Анкер клиновой 10x100 мм (10 шт)',
    price: 890,
    oldPrice: null,
    rating: 4.9,
    reviews: 5,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'fasteners',
    brand: 'Hilti',
    unit: 'уп',
    packSize: 10,
    description: 'Высокопрочный анкер для бетона и природного камня.',
    specs: { 'Диаметр': '10 мм', 'Длина': '100 мм', 'Нагрузка': 'до 500 кг' }
  },

  // --- ЭЛЕКТРИКА ---
  {
    id: 8,
    name: 'Кабель ВВГнг(А)-LS 3x2.5 мм² (50 метров)',
    price: 5200,
    oldPrice: 5800,
    rating: 5.0,
    reviews: 28,
    badge: 'ВЫБОР МАСТЕРОВ',
    badgeColor: 'bg-orange-500',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'electrical',
    brand: 'ГОСТ',
    unit: 'шт',
    description: 'Силовой кабель с медными жилами, не распространяющий горение.',
    specs: { 'Сечение': '3x2.5 мм²', 'Длина': '50 м', 'Тип': 'ВВГнг-LS' }
  },
  {
    id: 9,
    name: 'Розетка Schneider Electric AtlasDesign двойная белая',
    price: 380,
    oldPrice: null,
    rating: 4.8,
    reviews: 64,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'electrical',
    brand: 'Schneider Electric',
    unit: 'шт',
    description: 'Классическая двойная розетка со шторками для безопасности.',
    specs: { 'Тип монтажа': 'Скрытый', 'Степень защиты': 'IP20' }
  },

  // --- САНТЕХНИКА ---
  {
    id: 10,
    name: 'Смеситель для ванны Grohe BauLoop с душем',
    price: 8990,
    oldPrice: 11500,
    rating: 4.9,
    reviews: 41,
    badge: 'БРЕНД ГОДА',
    badgeColor: 'bg-blue-600',
    discount: '-22%',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'plumbing',
    brand: 'Grohe',
    unit: 'шт',
    description: 'Надежный немецкий смеситель с плавным ходом рукоятки.',
    specs: { 'Материал': 'Латунь', 'Гарантия': '5 лет', 'Излив': 'Фиксированный' }
  },
  {
    id: 11,
    name: 'Радиатор алюминиевый Royal Thermo Revolution 500 (10 секций)',
    price: 7500,
    oldPrice: null,
    rating: 4.7,
    reviews: 19,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1585642441995-15a4e5f769b7?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'plumbing',
    brand: 'Royal Thermo',
    unit: 'шт',
    description: 'Эффективный радиатор с высокой теплоотдачей для любых систем отопления.',
    specs: { 'Количество секций': '10', 'Теплоотдача': '1700 Вт', 'Давление': '20 бар' }
  },

  // --- КРАСКИ ---
  {
    id: 12,
    name: 'Краска интерьерная Tikkurila Euro Power 7 (9 л)',
    price: 6450,
    oldPrice: 7200,
    rating: 5.0,
    reviews: 53,
    badge: 'ЛУЧШАЯ ЦЕНА',
    badgeColor: 'bg-purple-500',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef0b?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'paints',
    brand: 'Tikkurila',
    unit: 'шт',
    description: 'Моющаяся матовая краска для стен и потолков.',
    specs: { 'Объем': '9 л', 'Степень блеска': 'Матовая', 'Расход': '12 м²/л' }
  },
  {
    id: 13,
    name: 'Грунтовка глубокого проникновения Ceresit CT 17 (10 л)',
    price: 950,
    oldPrice: null,
    rating: 4.9,
    reviews: 112,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'paints',
    brand: 'Ceresit',
    unit: 'шт',
    description: 'Укрепляет основание и улучшает адгезию перед покраской или укладкой плитки.',
    specs: { 'Объем': '10 л', 'Тип': 'Водно-дисперсионная' }
  },

  // --- МАТЕРИАЛЫ ---
  {
    id: 14,
    name: 'Гипсокартон Knauf влагостойкий 2500x1200x12.5 мм',
    price: 580,
    oldPrice: 650,
    rating: 4.8,
    reviews: 95,
    badge: null,
    discount: '-11%',
    image: 'https://images.unsplash.com/photo-1628527302488-34bc3a43d0b0?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'materials',
    brand: 'Knauf',
    unit: 'шт',
    description: 'Идеально подходит для отделки ванных комнат и влажных помещений.',
    specs: { 'Размер': '2500x1200 мм', 'Толщина': '12.5 мм', 'Тип': 'ГКЛВ' }
  },
  {
    id: 15,
    name: 'Штукатурка гипсовая Knauf Rotband (30 кг)',
    price: 620,
    oldPrice: null,
    rating: 4.9,
    reviews: 245,
    badge: 'ЛЕГЕНДА',
    badgeColor: 'bg-red-600',
    discount: null,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'materials',
    brand: 'Knauf',
    unit: 'уп',
    packSize: 30,
    description: 'Универсальная штукатурка для ручного нанесения на стены и потолки.',
    specs: { 'Вес': '30 кг', 'Основа': 'Гипс', 'Слой': 'от 5 до 50 мм' }
  },

  // --- СПЕЦОДЕЖДА ---
  {
    id: 16,
    name: 'Ботинки рабочие Delta Plus S3 с подноском',
    price: 4800,
    oldPrice: 5500,
    rating: 4.7,
    reviews: 31,
    badge: null,
    discount: '-13%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'clothing',
    brand: 'Delta Plus',
    unit: 'шт',
    description: 'Защитная обувь с металлическим подноском и антипрокольной стелькой.',
    specs: { 'Класс защиты': 'S3', 'Материал': 'Натуральная кожа', 'Размеры': '40-45' }
  },
  {
    id: 17,
    name: 'Костюм рабочий "Профи" (куртка+брюки) темно-синий',
    price: 3200,
    oldPrice: null,
    rating: 4.5,
    reviews: 14,
    badge: 'НОВИНКА',
    badgeColor: 'bg-emerald-500',
    discount: null,
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f6f1?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'clothing',
    brand: 'СпецКостюм',
    unit: 'шт',
    description: 'Износостойкий костюм из смесовой ткани с усилениями в области колен.',
    specs: { 'Материал': 'Твил (65% ПЭ, 35% ХБ)', 'Плотность': '240 г/м²' }
  },

  // --- ИЗМЕРЕНИЯ ---
  {
    id: 18,
    name: 'Лазерный уровень Bosch Quigo Green',
    price: 5990,
    oldPrice: 7500,
    rating: 4.9,
    reviews: 82,
    badge: 'АКЦИЯ',
    badgeColor: 'bg-red-500',
    discount: '-20%',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'measuring',
    brand: 'Bosch',
    unit: 'шт',
    description: 'Компактный лазерный нивелир с зеленым лучом для лучшей видимости.',
    specs: { 'Дальность': '12 м', 'Цвет луча': 'Зеленый', 'Погрешность': '± 0.8 мм/м' }
  },
  {
    id: 19,
    name: 'Рулетка измерительная Stanley Tylon 5м',
    price: 850,
    oldPrice: null,
    rating: 4.8,
    reviews: 156,
    badge: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
    categorySlug: 'measuring',
    brand: 'Stanley',
    unit: 'шт',
    description: 'Надежная рулетка с матовым покрытием ленты для работы на солнце.',
    specs: { 'Длина': '5 м', 'Ширина ленты': '19 мм', 'Зажим': 'Есть' }
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
