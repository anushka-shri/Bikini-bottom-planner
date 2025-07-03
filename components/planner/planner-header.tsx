"use client"
import { Button } from "@/components/ui/button"
import { BookOpen, PlusCircle, Download, StickyNote } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addItem, addStickyNote } from "@/lib/slices/plannerSlice"
import { createNewPlannerItem, exportToWord } from "./planner-utils"

export function PlannerHeader() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.planner.items)
  const stickyNotes = useAppSelector((state) => state.planner.stickyNotes)

  const handleAddItem = () => {
    const newItem = createNewPlannerItem()
    dispatch(addItem(newItem))
  }

  const handleAddStickyNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      text: "",
      position: { x: Math.random() * 300 + 50, y: Math.random() * 200 + 50 },
      zIndex: Math.max(...stickyNotes.map(note => note.zIndex || 0), 0) + 1
    }
    dispatch(addStickyNote(newNote))
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
          onClick={handleAddStickyNote}
          className="bg-yellow-400 border-2 border-yellow-600 rounded-xl font-bold text-yellow-900 px-5 py-2 hover:bg-yellow-300 flex items-center gap-2"
        >
          <StickyNote className="h-5 w-5" /> Add Note
        </Button>
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