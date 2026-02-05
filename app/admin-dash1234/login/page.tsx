"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { login } from "@/lib/outdoors-api"
import { storeToken } from "@/lib/auth-storage"

export default function AdminLoginPage() {
  const router = useRouter()
  const [usernameOrEmail, setUsernameOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("") // Declare email variable
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    console.log('[v0] Testing connection to backend...')
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
      })
      console.log('[v0] Health check response:', response.status)
      const data = await response.json()
      console.log('[v0] Health check data:', data)
      setError(`✓ Backend connected! Status: ${response.status}`)
    } catch (err) {
      console.error('[v0] Connection test error:', err)
      setError(`✗ Cannot reach backend: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Form submitted')
    console.log('[v0] usernameOrEmail:', usernameOrEmail)
    console.log('[v0] password:', password ? '***' : 'empty')
    
    setError("")
    setIsLoading(true)

    try {
      console.log('[v0] Calling login API...')
      const response = await login({
        usernameOrEmail,
        password,
      })

      console.log('[v0] Login successful, token received')
      console.log('[v0] Admin:', response.admin)

      // Store token and admin info
      storeToken(response.token, response.admin)
      
      console.log('[v0] Token stored, redirecting to dashboard...')
      // Redirect to dashboard
      router.push("/admin-dash1234")
    } catch (err) {
      console.error('[v0] Login catch error:', err)
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
      console.log('[v0] Login process complete')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-2">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-20">
              <Image src="/images/outdoors-logo.png" alt="Outdoors.ng Logo" fill className="object-contain" priority />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Sign in to manage billboards</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="usernameOrEmail">Email or Username</Label>
            <Input
              id="usernameOrEmail"
              type="text"
              placeholder="admin@outdoors.ng or admin"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>

          {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>}

          <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-10 text-sm bg-transparent" 
            onClick={testConnection}
          >
            Test Backend Connection
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Login with your admin credentials from the backend.</p>
          <p className="font-mono text-xs mt-1 text-yellow-600">Ensure the API proxy is reachable and env vars are configured.</p>
        </div>
      </Card>
    </div>
  )
}
