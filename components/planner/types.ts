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

export interface PlannerData {
  plannerItems: PlannerItemType[]
} 