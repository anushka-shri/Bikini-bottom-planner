import { PlannerItemType } from "./types"

export const createNewPlannerItem = (): PlannerItemType => ({
  id: `item-${Date.now()}`,
  title: "New Itinerary Item",
  type: "event",
  status: "pending",
  expenses: [],
  placesToGo: [],
  documents: [],
  date: new Date().toISOString().split("T")[0],
})

export const exportToWord = (items: PlannerItemType[]) => {
  const content = items
    .map(
      (item) =>
        `${item.title} (${item.type.toUpperCase()}) - ${item.status.toUpperCase()}\nDate: ${item.date || "Not set"
        }\nNotes: ${item.notes || "None"}\nExpenses: ${item.expenses.map((exp) => `${exp.description}: $${exp.amount}`).join(", ") || "None"
        }\nPlaces to Go: ${item.placesToGo.join(", ") || "None"}\nDocuments: ${item.documents.map((doc) => `${doc.name} (${doc.type})`).join(", ") || "None"
        }\n\n`,
    )
    .join("")

  const blob = new Blob([`ITINERARY TIMELINE\n\n${content}`], { type: "application/msword" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "itinerary.doc"
  a.click()
  URL.revokeObjectURL(url)
} 