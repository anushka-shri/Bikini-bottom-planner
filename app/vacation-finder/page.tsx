"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { DollarSign, Users, CalendarDays, Search, MapPin } from "lucide-react"

interface VacationSpot {
  id: string
  name: string
  imageQuery: string // Spongebob themed query for placeholder
  description: string
  estimatedCost: number
  type: "beach" | "adventure" | "city" | "relaxing"
  tags: string[] // e.g., 'kid-friendly', 'jellyfishing'
}

const allSpots: VacationSpot[] = [
  {
    id: "1",
    name: "Tropical Beach Paradise",
    imageQuery: "tropical beach with palm trees",
    description: "Relax on pristine sands with crystal-clear waters.",
    estimatedCost: 500,
    type: "beach",
    tags: ["relaxing", "swimming"],
  },
  {
    id: "2",
    name: "Mountain Hiking Retreat",
    imageQuery: "mountain hiking trail with scenic views",
    description: "Explore breathtaking trails and enjoy nature's beauty.",
    estimatedCost: 100,
    type: "adventure",
    tags: ["outdoors", "nature", "budget"],
  },
  {
    id: "3",
    name: "Historic City Exploration",
    imageQuery: "historic european city street",
    description: "Immerse yourself in rich history and vibrant culture.",
    estimatedCost: 200,
    type: "city",
    tags: ["cultural", "sightseeing"],
  },
  // Add more generic spots as needed
]

interface Preferences {
  budget: number
  vacationType: string // 'any' or specific type
  travelers: number
  duration: number
  kidFriendly: boolean
  jellyfishing: boolean
}

export default function VacationFinderPage() {
  const [preferences, setPreferences] = useState<Preferences>({
    budget: 300,
    vacationType: "any",
    travelers: 2,
    duration: 7,
    kidFriendly: false,
    jellyfishing: false,
  })
  const [suggestedSpots, setSuggestedSpots] = useState<VacationSpot[]>([])
  const [searched, setSearched] = useState(false)

  const handleInputChange = (field: keyof Preferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const results = allSpots.filter((spot) => {
      let matches = true
      if (spot.estimatedCost > preferences.budget) matches = false
      if (preferences.vacationType !== "any" && spot.type !== preferences.vacationType) matches = false
      if (preferences.kidFriendly && !spot.tags.includes("kid-friendly")) matches = false
      if (preferences.jellyfishing && !spot.tags.includes("jellyfishing")) matches = false
      // Add more filtering logic for travelers, duration if needed
      return matches
    })
    setSuggestedSpots(results)
    setSearched(true)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-white drop-shadow-lg">Find Your Perfect Vacation!</h1>

      <Card className="mb-10 underwater-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Tell Us Your Preferences!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="budget" className="flex items-center gap-1 font-semibold">
                <DollarSign size={16} /> Max Budget (per person)
              </Label>
              <Input
                id="budget"
                type="number"
                value={preferences.budget}
                onChange={(e) => handleInputChange("budget", Number.parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="vacationType" className="flex items-center gap-1 font-semibold">
                <MapPin size={16} /> Vacation Type
              </Label>
              <Select
                value={preferences.vacationType}
                onValueChange={(value) => handleInputChange("vacationType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="beach">Beach Getaway</SelectItem>
                  <SelectItem value="adventure">Adventure Trip</SelectItem>
                  <SelectItem value="city">City Break</SelectItem>
                  <SelectItem value="relaxing">Relaxing Escape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="travelers" className="flex items-center gap-1 font-semibold">
                <Users size={16} /> Number of Travelers
              </Label>
              <Input
                id="travelers"
                type="number"
                value={preferences.travelers}
                onChange={(e) => handleInputChange("travelers", Number.parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="duration" className="flex items-center gap-1 font-semibold">
                <CalendarDays size={16} /> Duration (days)
              </Label>
              <Input
                id="duration"
                type="number"
                value={preferences.duration}
                onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div className="md:col-span-2 space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kidFriendly"
                  checked={preferences.kidFriendly}
                  onCheckedChange={(checked) => handleInputChange("kidFriendly", checked)}
                />
                <Label htmlFor="kidFriendly" className="font-semibold">
                  Kid Friendly?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="jellyfishing"
                  checked={preferences.jellyfishing}
                  onCheckedChange={(checked) => handleInputChange("jellyfishing", checked)}
                />
                <Label htmlFor="jellyfishing" className="font-semibold">
                  Interested in Jellyfishing?
                </Label>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <Button type="submit" size="lg" className="text-xl px-8 py-4">
                <Search className="mr-2 h-5 w-5" /> Find My Spot!
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {searched && (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6 text-white drop-shadow-md">
            Here Be Your Suggestions!
          </h2>
          {suggestedSpots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedSpots.map((spot) => (
                <Card
                  key={spot.id}
                  className="flex flex-col underwater-card shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="aspect-[4/3] relative rounded-t-md overflow-hidden mb-2">
                      <Image
                        src={`/placeholder.svg?width=400&height=300&query=${encodeURIComponent(spot.imageQuery)}`}
                        alt={spot.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{spot.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{spot.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4 border-t">
                    <p className="font-semibold text-lg">${spot.estimatedCost}</p>
                    <Button variant="outline">Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <CardTitle className="text-xl mb-4">No spots match your search.</CardTitle>
              <CardContent>
                <p className="mb-4">Try adjusting your preferences.</p>
                <Image
                  src="/placeholder.svg?width=150&height=150"
                  alt="Sad Patrick"
                  width={150}
                  height={150}
                  className="mx-auto opacity-80"
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
