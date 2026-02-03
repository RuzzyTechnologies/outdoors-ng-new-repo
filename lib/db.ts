import { neon } from "@neondatabase/serverless"

// Create a reusable SQL client
export const sql = neon(process.env.NEON_DATABASE_URL!)

// Billboard types
export interface Billboard {
  id: number
  title: string
  description?: string
  location?: string
  state?: string
  city?: string
  area?: string
  address?: string
  price?: number
  size?: string
  width?: number
  height?: number
  type?: string
  category?: string
  status?: string
  image_url?: string
  images?: string[]
  featured?: boolean
  latitude?: number
  longitude?: number
  visibility?: string
  traffic_count?: number
  illuminated?: boolean
  created_at?: Date
  updated_at?: Date
}

// Get all billboards
export async function getBillboards() {
  return await sql`SELECT * FROM billboards ORDER BY created_at DESC`
}

// Get billboard by ID
export async function getBillboardById(id: number) {
  const result = await sql`SELECT * FROM billboards WHERE id = ${id}`
  return result[0]
}

// Get billboards by state
export async function getBillboardsByState(state: string) {
  return await sql`SELECT * FROM billboards WHERE state = ${state} ORDER BY created_at DESC`
}

// Get featured billboards
export async function getFeaturedBillboards() {
  return await sql`SELECT * FROM billboards WHERE featured = true ORDER BY created_at DESC`
}

// Create billboard
export async function createBillboard(billboard: Omit<Billboard, "id" | "created_at" | "updated_at">) {
  const result = await sql`
    INSERT INTO billboards (
      title, description, location, state, city, area, address, price, size, 
      width, height, type, category, status, image_url, images, featured, 
      latitude, longitude, visibility, traffic_count, illuminated
    ) VALUES (
      ${billboard.title}, ${billboard.description}, ${billboard.location}, 
      ${billboard.state}, ${billboard.city}, ${billboard.area}, ${billboard.address},
      ${billboard.price}, ${billboard.size}, ${billboard.width}, ${billboard.height},
      ${billboard.type}, ${billboard.category}, ${billboard.status}, ${billboard.image_url},
      ${JSON.stringify(billboard.images)}, ${billboard.featured}, ${billboard.latitude},
      ${billboard.longitude}, ${billboard.visibility}, ${billboard.traffic_count}, ${billboard.illuminated}
    )
    RETURNING *
  `
  return result[0]
}

// Update billboard
export async function updateBillboard(id: number, billboard: Partial<Billboard>) {
  const fields = []
  const values = []

  if (billboard.title !== undefined) {
    fields.push("title = $" + (fields.length + 1))
    values.push(billboard.title)
  }
  if (billboard.description !== undefined) {
    fields.push("description = $" + (fields.length + 1))
    values.push(billboard.description)
  }
  if (billboard.location !== undefined) {
    fields.push("location = $" + (fields.length + 1))
    values.push(billboard.location)
  }
  if (billboard.state !== undefined) {
    fields.push("state = $" + (fields.length + 1))
    values.push(billboard.state)
  }
  if (billboard.price !== undefined) {
    fields.push("price = $" + (fields.length + 1))
    values.push(billboard.price)
  }
  if (billboard.status !== undefined) {
    fields.push("status = $" + (fields.length + 1))
    values.push(billboard.status)
  }

  const result = await sql`
    UPDATE billboards 
    SET ${sql.unsafe(fields.join(", "))}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

// Delete billboard
export async function deleteBillboard(id: number) {
  await sql`DELETE FROM billboards WHERE id = ${id}`
}

// Search billboards
export async function searchBillboards(query: string) {
  return await sql`
    SELECT * FROM billboards 
    WHERE title ILIKE ${`%${query}%`} 
       OR location ILIKE ${`%${query}%`}
       OR state ILIKE ${`%${query}%`}
       OR city ILIKE ${`%${query}%`}
    ORDER BY created_at DESC
  `
}
