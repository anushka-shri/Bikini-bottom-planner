"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  PlannerHeader, 
  PlannerTimeline, 
  ExpenseTracker,
  DraggableStickyNote
} from "@/components/planner"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setItems } from "@/lib/slices/plannerSlice"
import itinerariesData from "../../../data.json"
import type { ItinerariesData, ItineraryType } from "@/components/planner"

export default function PlannerPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const stickyNotes = useAppSelector((state) => state.planner.stickyNotes)
  const [itinerary, setItinerary] = useState<ItineraryType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = itinerariesData as ItinerariesData
    const itineraryId = params.id as string
    const foundItinerary = data.itineraries.find(it => it.id === itineraryId)
    
    if (foundItinerary) {
      setItinerary(foundItinerary)
      dispatch(setItems(foundItinerary.plannerItems))
    } else {
      // Redirect to itineraries page if itinerary not found
      router.push('/itineraries')
    }
    setLoading(false)
  }, [params.id, dispatch, router])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🧽</div>
          <p>Loading your itinerary...</p>
        </div>
      </div>
    )
  }

  if (!itinerary) {
    return null
  }

  return (
    <div className="relative min-h-screen">
      {/* Draggable Sticky Notes */}
      {stickyNotes.map((note) => (
        <DraggableStickyNote key={note.id} note={note} />
      ))}

      <div className="container py-8">
        {/* Back Button */}
        <div className="mb-12">
          <Button 
            onClick={() => router.push('/itineraries')}
            className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" /> Back 
          </Button>
        </div>

        {/* Itinerary Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2" style={{
            fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif",
            color: '#FFFF31',
            WebkitTextStroke: '1px #0099cc',
            textShadow: '2px 2px 0 #0099cc'
          }}>
            {itinerary.name}
          </h1>
          {/* <p className="text-lg mb-2 text-gray-700">{itinerary.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>📍 {itinerary.destination}</span>
            <span>📅 {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
            <span>💰 Budget: ${itinerary.totalBudget}</span>
          </div> */}
        </div>

        {/* Main Timeline Section */}
        <div className="mb-20">
          <PlannerHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PlannerTimeline/>
            </div>
            <div className="lg:col-span-1">
              <ExpenseTracker />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 