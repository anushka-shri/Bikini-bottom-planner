export type Expense = { id: string; description: string; amount: number }
export type DocumentFile = { id: string; name: string; type: string }

export interface PlannerItemType {
  id: string
  title: string
  type: "booking" | "stay" | "travel" | "event"
  status: "pending" | "booked"
  date?: string
  notes?: string
  expenses: Expense[]
  placesToGo: string[]
  documents: DocumentFile[]
}

export interface ItineraryType {
  id: string
  name: string
  description: string
  destination: string
  startDate: string
  endDate: string
  totalBudget: number
  status: "planning" | "active" | "completed"
  plannerItems: PlannerItemType[]
}

export interface PlannerData {
  plannerItems: PlannerItemType[]
}

export interface ItinerariesData {
  itineraries: ItineraryType[]
}

export interface StickyNote {
  id: string
  text: string
  position?: { x: number; y: number }
  zIndex?: number
  color?: string
} 