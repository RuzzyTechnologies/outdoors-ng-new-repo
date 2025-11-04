"use client"

import { useState, useEffect } from "react"
import { getAllVASOrders, type VASOrder } from "@/lib/admin-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MonitoringPage() {
  const [orders, setOrders] = useState<VASOrder[]>([])
  const [stats, setStats] = useState({
    total: 0,
    printing: 0,
    installation: 0,
    deployment: 0,
    completed: 0,
  })

  useEffect(() => {
    const allOrders = getAllVASOrders()
    setOrders(allOrders)
    setStats({
      total: allOrders.length,
      printing: allOrders.filter((o) => o.status === "printing").length,
      installation: allOrders.filter((o) => o.status === "installation").length,
      deployment: allOrders.filter((o) => o.status === "deployment").length,
      completed: allOrders.filter((o) => o.status === "completed").length,
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">VAS Monitoring Dashboard</h1>
        <p className="text-muted-foreground">Overview of all value-added services</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.total}</CardTitle>
            <CardDescription>Total Orders</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.printing}</CardTitle>
            <CardDescription>In Printing</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.installation}</CardTitle>
            <CardDescription>In Installation</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.deployment}</CardTitle>
            <CardDescription>In Deployment</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest VAS orders across all stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 10).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{order.clientName}</p>
                  <p className="text-sm text-muted-foreground">{order.service}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : order.status === "printing" ? "secondary" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">₦{order.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
