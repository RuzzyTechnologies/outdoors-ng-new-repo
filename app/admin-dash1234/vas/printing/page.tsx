"use client"

import { useState, useEffect } from "react"
import { getAllVASOrders, updateVASOrder, type VASOrder } from "@/lib/admin-storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PrintingOrdersPage() {
  const [orders, setOrders] = useState<VASOrder[]>([])

  useEffect(() => {
    const allOrders = getAllVASOrders()
    setOrders(allOrders.filter((o) => o.status === "printing"))
  }, [])

  const moveToInstallation = (id: number) => {
    if (updateVASOrder(id, { status: "installation" })) {
      const allOrders = getAllVASOrders()
      setOrders(allOrders.filter((o) => o.status === "printing"))
      alert("Order moved to installation!")
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Orders on Printing</h1>
        <p className="text-muted-foreground">Manage orders currently in printing stage</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{order.clientName}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{order.service}</p>
                </div>
                <Badge>Printing</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {order.clientEmail}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Amount:</span> ₦{order.amount.toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Notes:</span> {order.notes}
                </p>
                <Button onClick={() => moveToInstallation(order.id)} className="mt-4">
                  Move to Installation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No orders in printing stage.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
