import { createClient } from "@/lib/supabase/client"

export interface Billboard {
  id: number
  title: string
  location: string
  city?: string
  state?: string
  area?: string
  address?: string
  type: string
  size: string
  width?: number
  height?: number
  availability?: string
  status?: string
  visibility?: string
  description?: string
  image?: string
  image_url?: string
  images?: any
  featured: boolean
  illuminated?: boolean
  latitude?: number
  longitude?: number
  traffic_count?: number
  price?: number
  category?: string
  created_at?: string
  updated_at?: string
}

export async function getAllBillboards(): Promise<Billboard[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("billboards").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching billboards:", error)
    return []
  }

  return data || []
}

export async function getBillboardById(id: number): Promise<Billboard | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from("billboards").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching billboard:", error)
    return null
  }

  return data
}

export async function addBillboard(billboard: Omit<Billboard, "id" | "created_at">): Promise<Billboard | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("billboards")
    .insert({
      ...billboard,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error adding billboard:", error)
    return null
  }

  return data
}

export async function updateBillboard(id: number, updates: Partial<Billboard>): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("billboards")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("[v0] Error updating billboard:", error)
    return false
  }

  return true
}

export async function deleteBillboard(id: number): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase.from("billboards").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting billboard:", error)
    return false
  }

  return true
}
