"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Calendar, MapPin, DollarSign } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setItineraries, addItinerary, updateItinerary } from "@/lib/slices/plannerSlice"
import itinerariesData from "../../data.json"
import type { ItinerariesData, ItineraryType } from "@/components/planner"

export default function ItinerariesPage() {
  const dispatch = useAppDispatch()
  const itineraries = useAppSelector((state) => state.planner.itineraries)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newItinerary, setNewItinerary] = useState({
    title: "",
    location: "",
    budget: "",
    startDate: "",
    endDate: ""
  })

  // Initialize itineraries from data.json on component mount
  useEffect(() => {
    const data = itinerariesData as ItinerariesData
    if (itineraries.length === 0) {
      dispatch(setItineraries(data.itineraries))
    }
  }, [dispatch, itineraries.length])

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
    const itinerary = itineraries.find(it => it.id === itineraryId)
    if (itinerary) {
      const statusOrder = ["planning", "active", "completed"]
      const currentIndex = statusOrder.indexOf(itinerary.status)
      const nextIndex = (currentIndex + 1) % statusOrder.length
      const updatedItinerary = {
        ...itinerary,
        status: statusOrder[nextIndex] as "planning" | "active" | "completed"
      }
      dispatch(updateItinerary(updatedItinerary))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleCreateItinerary = () => {
    if (newItinerary.title.trim() && newItinerary.location.trim() && newItinerary.budget.trim() && newItinerary.startDate && newItinerary.endDate) {
      const newItineraryData: ItineraryType = {
        id: `itinerary-${Date.now()}`,
        name: newItinerary.title,
        description: `A new adventure to ${newItinerary.location}!`,
        destination: newItinerary.location,
        startDate: newItinerary.startDate,
        endDate: newItinerary.endDate,
        totalBudget: parseInt(newItinerary.budget) || 0,
        status: "planning",
        plannerItems: []
      }

      dispatch(addItinerary(newItineraryData))
      setNewItinerary({ title: "", location: "", budget: "", startDate: "", endDate: "" })
      setIsCreateDialogOpen(false)
    }
  }



  return (
    <div className="container py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{
          fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif",
          color: '#FFFF31',
          WebkitTextStroke: '1px #0099cc',
          textShadow: '2px 2px 0 #0099cc'
        }}>
          Your Itineraries
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2">
              <Plus className="h-5 w-5" /> Create New 
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] bg-white/90 backdrop-blur-sm border border-sponge-blue/50 rounded-lg shadow-lg">
            <DialogHeader className="text-center pb-4">
              <DialogTitle className="text-xl font-bold text-sponge-blue">
                Create New Itinerary
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm mt-1">
                Plan your next underwater adventure
              </DialogDescription>
            </DialogHeader>
                          <div className="grid gap-4 py-4">
                <div className="space-y-1">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newItinerary.title}
                    onChange={(e) => setNewItinerary({ ...newItinerary, title: e.target.value })}
                    className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                    placeholder="e.g., Bikini Bottom Adventure"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newItinerary.location}
                      onChange={(e) => setNewItinerary({ ...newItinerary, location: e.target.value })}
                      className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                      placeholder="e.g., Goo Lagoon"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                      Budget
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newItinerary.budget}
                      onChange={(e) => setNewItinerary({ ...newItinerary, budget: e.target.value })}
                      className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newItinerary.startDate}
                    onChange={(e) => setNewItinerary({ ...newItinerary, startDate: e.target.value })}
                    className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newItinerary.endDate}
                    onChange={(e) => setNewItinerary({ ...newItinerary, endDate: e.target.value })}
                    className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                onClick={handleCreateItinerary}
                className="bg-sponge-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                disabled={!newItinerary.title.trim() || !newItinerary.location.trim() || !newItinerary.budget.trim() || !newItinerary.startDate || !newItinerary.endDate}
              >
                Create Itinerary
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500">
          {itineraries.length} itinerary{itineraries.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
                      <Card key={itinerary.id} className="bg-white/80 backdrop-blur-sm border-2 border-sponge-blue hover:border-yellow-400 hover:shadow-lg transition-shadow duration-200 cursor-pointer shadow-xl rounded-2xl">
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
              <Button className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2">
                <Plus className="h-5 w-5" /> Create Your First Itinerary
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] bg-white/90 backdrop-blur-sm border border-sponge-blue/50 rounded-lg shadow-lg">
              <DialogHeader className="text-center pb-4">
                <DialogTitle className="text-xl font-bold text-sponge-blue">
                  Create New Itinerary
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-sm mt-1">
                  Plan your next underwater adventure
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-1">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newItinerary.title}
                    onChange={(e) => setNewItinerary({ ...newItinerary, title: e.target.value })}
                    className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                    placeholder="e.g., Bikini Bottom Adventure"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newItinerary.location}
                      onChange={(e) => setNewItinerary({ ...newItinerary, location: e.target.value })}
                      className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                      placeholder="e.g., Goo Lagoon"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                      Budget
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newItinerary.budget}
                      onChange={(e) => setNewItinerary({ ...newItinerary, budget: e.target.value })}
                      className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newItinerary.startDate}
                      onChange={(e) => setNewItinerary({ ...newItinerary, startDate: e.target.value })}
                      className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newItinerary.endDate}
                      onChange={(e) => setNewItinerary({ ...newItinerary, endDate: e.target.value })}
                      className="border border-gray-300 focus:border-sponge-blue rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  onClick={handleCreateItinerary}
                  className="bg-sponge-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  disabled={!newItinerary.title.trim() || !newItinerary.location.trim() || !newItinerary.budget.trim() || !newItinerary.startDate || !newItinerary.endDate}
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