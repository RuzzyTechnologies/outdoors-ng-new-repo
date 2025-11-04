"use client"

import { useState, useEffect } from "react"
import { getAllStates, deleteState, type State } from "@/lib/admin-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AllStatesPage() {
  const [states, setStates] = useState<State[]>([])
  const router = useRouter()

  useEffect(() => {
    setStates(getAllStates())
  }, [])

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this state?")) {
      if (deleteState(id)) {
        setStates(getAllStates())
        alert("State deleted successfully!")
      }
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All States</h1>
        <p className="text-muted-foreground">Manage all states/locations in the system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => (
          <Card key={state.id}>
            <CardHeader>
              <CardTitle>{state.name}</CardTitle>
              <CardDescription>Code: {state.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end gap-2">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(state.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {states.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No states found. Add your first state to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
