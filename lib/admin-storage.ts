// Storage utilities for admin data management

// ============= STATES/LOCATIONS =============
export interface State {
  id: number
  name: string
  code: string
  createdAt: string
}

export interface StateArea {
  id: number
  stateId: number
  name: string
  description: string
  createdAt: string
}

const STATES_KEY = "outdoors_states"
const STATE_AREAS_KEY = "outdoors_state_areas"

const defaultStates: State[] = [
  { id: 1, name: "Lagos", code: "LAG", createdAt: new Date().toISOString() },
  { id: 2, name: "Abuja", code: "ABJ", createdAt: new Date().toISOString() },
  { id: 3, name: "Rivers", code: "RIV", createdAt: new Date().toISOString() },
]

const defaultStateAreas: StateArea[] = [
  { id: 1, stateId: 1, name: "Ikeja", description: "Commercial hub of Lagos", createdAt: new Date().toISOString() },
  { id: 2, stateId: 1, name: "Lekki", description: "Upscale residential area", createdAt: new Date().toISOString() },
  { id: 3, stateId: 1, name: "Victoria Island", description: "Business district", createdAt: new Date().toISOString() },
]

export function getAllStates(): State[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STATES_KEY)
  if (!stored) {
    localStorage.setItem(STATES_KEY, JSON.stringify(defaultStates))
    return defaultStates
  }
  return JSON.parse(stored)
}

export function addState(state: Omit<State, "id" | "createdAt">): State {
  const states = getAllStates()
  const newId = Math.max(0, ...states.map((s) => s.id)) + 1
  const newState: State = { ...state, id: newId, createdAt: new Date().toISOString() }
  states.push(newState)
  localStorage.setItem(STATES_KEY, JSON.stringify(states))
  return newState
}

export function updateState(id: number, updates: Partial<State>): boolean {
  const states = getAllStates()
  const index = states.findIndex((s) => s.id === id)
  if (index === -1) return false
  states[index] = { ...states[index], ...updates }
  localStorage.setItem(STATES_KEY, JSON.stringify(states))
  return true
}

export function deleteState(id: number): boolean {
  const states = getAllStates()
  const filtered = states.filter((s) => s.id !== id)
  if (filtered.length === states.length) return false
  localStorage.setItem(STATES_KEY, JSON.stringify(filtered))
  return true
}

export function getAllStateAreas(): StateArea[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STATE_AREAS_KEY)
  if (!stored) {
    localStorage.setItem(STATE_AREAS_KEY, JSON.stringify(defaultStateAreas))
    return defaultStateAreas
  }
  return JSON.parse(stored)
}

export function addStateArea(area: Omit<StateArea, "id" | "createdAt">): StateArea {
  const areas = getAllStateAreas()
  const newId = Math.max(0, ...areas.map((a) => a.id)) + 1
  const newArea: StateArea = { ...area, id: newId, createdAt: new Date().toISOString() }
  areas.push(newArea)
  localStorage.setItem(STATE_AREAS_KEY, JSON.stringify(areas))
  return newArea
}

export function deleteStateArea(id: number): boolean {
  const areas = getAllStateAreas()
  const filtered = areas.filter((a) => a.id !== id)
  if (filtered.length === areas.length) return false
  localStorage.setItem(STATE_AREAS_KEY, JSON.stringify(filtered))
  return true
}

// ============= PRODUCT CATEGORIES =============
export interface ProductCategory {
  id: number
  name: string
  description: string
  createdAt: string
}

const CATEGORIES_KEY = "outdoors_categories"

const defaultCategories: ProductCategory[] = [
  { id: 1, name: "Billboards", description: "Traditional billboard advertising", createdAt: new Date().toISOString() },
  { id: 2, name: "LED Screens", description: "Digital LED displays", createdAt: new Date().toISOString() },
  { id: 3, name: "Transit Ads", description: "Bus and vehicle advertising", createdAt: new Date().toISOString() },
]

export function getAllCategories(): ProductCategory[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(CATEGORIES_KEY)
  if (!stored) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories))
    return defaultCategories
  }
  return JSON.parse(stored)
}

export function addCategory(category: Omit<ProductCategory, "id" | "createdAt">): ProductCategory {
  const categories = getAllCategories()
  const newId = Math.max(0, ...categories.map((c) => c.id)) + 1
  const newCategory: ProductCategory = { ...category, id: newId, createdAt: new Date().toISOString() }
  categories.push(newCategory)
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  return newCategory
}

export function deleteCategory(id: number): boolean {
  const categories = getAllCategories()
  const filtered = categories.filter((c) => c.id !== id)
  if (filtered.length === categories.length) return false
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered))
  return true
}

// ============= PRODUCTS =============
export interface Product {
  id: number
  name: string
  categoryId: number
  description: string
  price: number
  featured: boolean
  image: string
  createdAt: string
}

const PRODUCTS_KEY = "outdoors_products"

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Premium Billboard Package",
    categoryId: 1,
    description: "3-month billboard advertising package",
    price: 500000,
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
    createdAt: new Date().toISOString(),
  },
]

export function getAllProducts(): Product[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(PRODUCTS_KEY)
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts))
    return defaultProducts
  }
  return JSON.parse(stored)
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getAllProducts()
  const newId = Math.max(0, ...products.map((p) => p.id)) + 1
  const newProduct: Product = { ...product, id: newId, createdAt: new Date().toISOString() }
  products.push(newProduct)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return newProduct
}

export function updateProduct(id: number, updates: Partial<Product>): boolean {
  const products = getAllProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false
  products[index] = { ...products[index], ...updates }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return true
}

export function deleteProduct(id: number): boolean {
  const products = getAllProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered))
  return true
}

// ============= VAS ORDERS =============
export interface VASOrder {
  id: number
  clientName: string
  clientEmail: string
  service: string
  status: "printing" | "installation" | "deployment" | "completed"
  amount: number
  notes: string
  createdAt: string
}

const VAS_ORDERS_KEY = "outdoors_vas_orders"

const defaultVASOrders: VASOrder[] = [
  {
    id: 1,
    clientName: "John Doe",
    clientEmail: "john@example.com",
    service: "Billboard Printing",
    status: "printing",
    amount: 150000,
    notes: "Urgent order for campaign launch",
    createdAt: new Date().toISOString(),
  },
]

export function getAllVASOrders(): VASOrder[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(VAS_ORDERS_KEY)
  if (!stored) {
    localStorage.setItem(VAS_ORDERS_KEY, JSON.stringify(defaultVASOrders))
    return defaultVASOrders
  }
  return JSON.parse(stored)
}

export function addVASOrder(order: Omit<VASOrder, "id" | "createdAt">): VASOrder {
  const orders = getAllVASOrders()
  const newId = Math.max(0, ...orders.map((o) => o.id)) + 1
  const newOrder: VASOrder = { ...order, id: newId, createdAt: new Date().toISOString() }
  orders.push(newOrder)
  localStorage.setItem(VAS_ORDERS_KEY, JSON.stringify(orders))
  return newOrder
}

export function updateVASOrder(id: number, updates: Partial<VASOrder>): boolean {
  const orders = getAllVASOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return false
  orders[index] = { ...orders[index], ...updates }
  localStorage.setItem(VAS_ORDERS_KEY, JSON.stringify(orders))
  return true
}

export function deleteVASOrder(id: number): boolean {
  const orders = getAllVASOrders()
  const filtered = orders.filter((o) => o.id !== id)
  if (filtered.length === orders.length) return false
  localStorage.setItem(VAS_ORDERS_KEY, JSON.stringify(filtered))
  return true
}
