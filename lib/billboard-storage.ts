export interface Billboard {
  id: number
  title: string
  location: string
  type: string
  size: string
  availability: string
  description: string
  image: string
  featured: boolean
  createdAt: string
}

const STORAGE_KEY = "outdoors_billboards"

// Initialize with default billboards if storage is empty
const defaultBillboards: Billboard[] = [
  {
    id: 1,
    title: "BRT Billboard In Ikeja, Lagos",
    location: "Ikeja, Lagos",
    type: "BRT Billboard",
    size: "48 Sheet",
    availability: "Available Now",
    description:
      "Prime billboard location along the busy BRT corridor in Ikeja. High visibility with thousands of daily commuters passing by.",
    image: "/brt-billboard-lagos-nigeria.jpg",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "48 Sheet Billboard Along Ikotun-Idimu Road",
    location: "Ikotun, Lagos",
    type: "48 Sheet",
    size: "48 Sheet",
    availability: "Available Now",
    description:
      "Strategic 48-sheet billboard positioned on the heavily trafficked Ikotun-Idimu Road. Excellent exposure to vehicular and pedestrian traffic.",
    image: "/48-sheet-billboard-lagos-road.jpg",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Cube Led Billboard At Lekki Phase 1",
    location: "Lekki, Lagos",
    type: "LED Billboard",
    size: "LED Screen",
    availability: "Coming Soon",
    description:
      "Modern LED cube billboard in the upscale Lekki Phase 1 area. Digital display with rotating content capability.",
    image: "/led-cube-billboard-lekki-lagos.jpg",
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

export function getAllBillboards(): Billboard[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBillboards))
    return defaultBillboards
  }
  return JSON.parse(stored)
}

export function getBillboardById(id: number): Billboard | undefined {
  const billboards = getAllBillboards()
  return billboards.find((b) => b.id === id)
}

export function addBillboard(billboard: Omit<Billboard, "id" | "createdAt">): Billboard {
  const billboards = getAllBillboards()
  const newId = Math.max(0, ...billboards.map((b) => b.id)) + 1
  const newBillboard: Billboard = {
    ...billboard,
    id: newId,
    createdAt: new Date().toISOString(),
  }
  billboards.push(newBillboard)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(billboards))
  return newBillboard
}

export function updateBillboard(id: number, updates: Partial<Billboard>): boolean {
  const billboards = getAllBillboards()
  const index = billboards.findIndex((b) => b.id === id)
  if (index === -1) return false

  billboards[index] = { ...billboards[index], ...updates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(billboards))
  return true
}

export function deleteBillboard(id: number): boolean {
  const billboards = getAllBillboards()
  const filtered = billboards.filter((b) => b.id !== id)
  if (filtered.length === billboards.length) return false

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}
