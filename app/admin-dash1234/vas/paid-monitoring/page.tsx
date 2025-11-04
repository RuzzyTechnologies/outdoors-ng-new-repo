"use client"

import { useState, useEffect } from "react"
import { getAllVASOrders, type VASOrder } from "@/lib/admin-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PaidMonitoringPage() {
  const [orders, setOrders] = useState<VASOrder[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const allOrders = getAllVASOrders()
    setOrders(allOrders)
    setTotalRevenue(allOrders.reduce((sum, order) => sum + order.amount, 0))
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Paid Outdoor Monitoring</h1>
        <p className="text-muted-foreground">Track all paid outdoor advertising services</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">₦{totalRevenue.toLocaleString()}</CardTitle>
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{orders.length}</CardTitle>
            <CardDescription>Total Paid Orders</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Paid Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{order.clientName}</p>
                  <p className="text-sm text-muted-foreground">{order.clientEmail}</p>
                  <p className="text-sm mt-1">{order.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{order.amount.toLocaleString()}</p>
                  <Badge variant="secondary" className="mt-1">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
