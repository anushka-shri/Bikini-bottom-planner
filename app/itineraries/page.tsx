"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Calendar, MapPin, DollarSign } from "lucide-react"
import itinerariesData from "../../data.json"
import type { ItinerariesData, ItineraryType } from "@/components/planner"

export default function ItinerariesPage() {
  const data = itinerariesData as ItinerariesData
  const [itineraries, setItineraries] = useState<ItineraryType[]>(data.itineraries)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newItinerary, setNewItinerary] = useState({
    title: "",
    location: ""
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "active":
        return "bg-green-500 hover:bg-green-600"
      case "completed":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "planning":
        return "Planning"
      case "active":
        return "Active"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  const toggleStatus = (itineraryId: string) => {
    setItineraries(prevItineraries => 
      prevItineraries.map(itinerary => {
        if (itinerary.id === itineraryId) {
          const statusOrder = ["planning", "active", "completed"]
          const currentIndex = statusOrder.indexOf(itinerary.status)
          const nextIndex = (currentIndex + 1) % statusOrder.length
          return {
            ...itinerary,
            status: statusOrder[nextIndex] as "planning" | "active" | "completed"
          }
        }
        return itinerary
      })
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleCreateItinerary = () => {
    if (newItinerary.title.trim() && newItinerary.location.trim()) {
      const newItineraryData: ItineraryType = {
        id: `itinerary-${Date.now()}`,
        name: newItinerary.title,
        description: `A new adventure to ${newItinerary.location}!`,
        destination: newItinerary.location,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        totalBudget: 0,
        status: "planning",
        plannerItems: []
      }

      setItineraries([...itineraries, newItineraryData])
      setNewItinerary({ title: "", location: "" })
      setIsCreateDialogOpen(false)
    }
  }



  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{
          fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif",
          color: '#FFFF31',
          WebkitTextStroke: '1px #0099cc',
          textShadow: '2px 2px 0 #0099cc'
        }}>
          Your Itineraries
        </h1>
        <p className="text-lg text-gray-600">Plan and manage your underwater adventures!</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {itineraries.length} itinerary{itineraries.length !== 1 ? 's' : ''} found
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sponge-yellow hover:bg-yellow-400 text-black font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Create New Itinerary
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Itinerary</DialogTitle>
              <DialogDescription>
                Plan your next underwater adventure! Enter the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newItinerary.title}
                  onChange={(e) => setNewItinerary({ ...newItinerary, title: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Bikini Bottom Adventure"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newItinerary.location}
                  onChange={(e) => setNewItinerary({ ...newItinerary, location: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Goo Lagoon"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleCreateItinerary}
                className="bg-sponge-blue hover:bg-blue-600 text-white"
                disabled={!newItinerary.title.trim() || !newItinerary.location.trim()}
              >
                Create Itinerary
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
                      <Card key={itinerary.id} className="bg-white/80 backdrop-blur-sm border-2 border-sponge-blue hover:border-yellow-400 hover:shadow-lg transition-shadow duration-200 cursor-pointer shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Link href={`/planner/${itinerary.id}`} className="flex-1">
                    <CardTitle className="text-xl font-bold text-sponge-blue">
                      {itinerary.name}
                    </CardTitle>
                  </Link>
                  <Badge 
                    className={`${getStatusColor(itinerary.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleStatus(itinerary.id)
                    }}
                  >
                    {getStatusText(itinerary.status)}
                  </Badge>
                </div>
                  <CardDescription className="text-gray-600">
                    {itinerary.description}
                  </CardDescription>
                </CardHeader>
                <Link href={`/planner/${itinerary.id}`}>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-sponge-blue" />
                        {itinerary.destination}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-sponge-blue" />
                        {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 text-sponge-blue" />
                        Budget: ${itinerary.totalBudget}
                      </div>
                      
                      <div className="pt-2">
                        <div className="text-sm text-gray-500">
                          {itinerary.plannerItems.length} item{itinerary.plannerItems.length !== 1 ? 's' : ''} planned
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
        ))}
      </div>

      {itineraries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-float">🧽</div>
          <h3 className="text-xl font-semibold mb-2">No itineraries yet!</h3>
          <p className="text-gray-600 mb-6">Start planning your first underwater adventure!</p>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-sponge-yellow hover:bg-yellow-400 text-black font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Itinerary
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Itinerary</DialogTitle>
                <DialogDescription>
                  Plan your next underwater adventure! Enter the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newItinerary.title}
                    onChange={(e) => setNewItinerary({ ...newItinerary, title: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Bikini Bottom Adventure"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newItinerary.location}
                    onChange={(e) => setNewItinerary({ ...newItinerary, location: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Goo Lagoon"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleCreateItinerary}
                  className="bg-sponge-blue hover:bg-blue-600 text-white"
                  disabled={!newItinerary.title.trim() || !newItinerary.location.trim()}
                >
                  Create Itinerary
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
} 