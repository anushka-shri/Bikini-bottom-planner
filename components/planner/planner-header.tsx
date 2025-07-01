"use client"
import { Button } from "@/components/ui/button"
import { BookOpen, PlusCircle, Download } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { addItem } from "@/lib/slices/plannerSlice"
import { createNewPlannerItem, exportToWord } from "./planner-utils"
import { useAppSelector } from "@/lib/hooks"

export function PlannerHeader() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.planner.items)

  const handleAddItem = () => {
    const newItem = createNewPlannerItem()
    dispatch(addItem(newItem))
  }

  const handleExport = () => {
    exportToWord(items)
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-white drop-shadow-md flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-yellow-300" />
        Itinerary Timeline
      </h1>

      <div className="flex gap-2">
        <Button 
          onClick={handleAddItem} 
          className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" /> Add Item
        </Button>
        <Button 
          onClick={handleExport} 
          variant="outline" 
          className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2"
        >
          <Download className="h-5 w-5" /> Download
        </Button>
      </div>
    </div>
  )
} 