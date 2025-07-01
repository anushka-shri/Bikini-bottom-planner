"use client"
import { useState } from "react"
import plannerData from "../../data.json"
import { 
  PlannerHeader, 
  PlannerTimeline, 
  ExpenseTracker, 
  createNewPlannerItem, 
  exportToWord,
  type PlannerItemType,
  type PlannerData 
} from "@/components/planner"

export default function PlannerPage() {
  const [items, setItems] = useState<PlannerItemType[]>((plannerData as PlannerData).plannerItems)

  const addNewItem = () => {
    const newItem = createNewPlannerItem()
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = (updatedItem: PlannerItemType) => {
    setItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleReorder = (reorderedItems: PlannerItemType[]) => {
    setItems(reorderedItems)
  }

  const handleExport = () => {
    exportToWord(items)
  }

  return (
    <div className="container py-8">
      {/* Main Timeline Section */}
      <div className="mb-8">
        <PlannerHeader onAddItem={addNewItem} onExport={handleExport} />
        
        <PlannerTimeline 
          items={items} 
          updateItem={updateItem} 
          deleteItem={deleteItem} 
          onReorder={handleReorder}
        />
      </div>

      {/* Styled Expense Tracker at Bottom */}
      <div className="w-[85%]">
        <ExpenseTracker items={items} />
      </div>
    </div>
  )
}
