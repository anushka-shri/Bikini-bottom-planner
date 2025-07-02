"use client"
import { useState } from "react"
import { Plus, Trash2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addStickyNote, deleteStickyNote } from "@/lib/slices/plannerSlice"
import type { StickyNote } from "./types"

export function StickyNotes() {
  const dispatch = useAppDispatch()
  const stickyNotes = useAppSelector((state) => state.planner.stickyNotes)
  const [newNote, setNewNote] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: StickyNote = {
        id: Date.now().toString(),
        text: newNote.trim()
      }
      dispatch(addStickyNote(note))
      setNewNote('')
    }
  }

  const handleDeleteNote = (id: string) => {
    dispatch(deleteStickyNote(id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddNote()
    }
  }

  return (
    <div className="bg-yellow-100/80 backdrop-blur-sm border-2 border-yellow-300 rounded-2xl p-4 shadow-lg w-full max-w-md h-fit">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full cursor-pointer">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-yellow-800">📝 Sticky Notes</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              
              <ChevronDown className="w-6 h-6 text-yellow-800 transition-transform duration-300 data-[state=open]:rotate-180" />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-6 space-y-6">
          <hr className="border-yellow-200" />
          
          {/* Add New Note */}
          <div className="flex gap-2">
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new note..."
              className="flex-1 text-sm border-yellow-300 focus:border-yellow-500 rounded-lg"
            />
            <Button 
              onClick={handleAddNote}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {stickyNotes.length > 0 ? (
              stickyNotes.map((note) => (
                <div key={note.id} className="bg-yellow-200/60 p-3 rounded-xl border border-yellow-400 relative group">
                  <p className="text-sm text-yellow-900 pr-8">{note.text}</p>
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      onClick={() => handleDeleteNote(note.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-yellow-700 text-center py-4 font-semibold">No notes yet. Add your first note!</p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
} 