"use client"
import { useState, useRef, useEffect } from "react"
import { X, Edit2, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { useAppDispatch } from "@/lib/hooks"
import { updateStickyNote, updateStickyNotePosition, updateStickyNoteColor, deleteStickyNote } from "@/lib/slices/plannerSlice"
import type { StickyNote } from "./types"

interface DraggableStickyNoteProps {
  note: StickyNote
}

export function DraggableStickyNote({ note }: DraggableStickyNoteProps) {
  const dispatch = useAppDispatch()
  const [isDragging, setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(note.text === "") // Start editing if note is empty
  const [text, setText] = useState(note.text)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hue, setHue] = useState(60) // Default yellow hue
  const noteRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Convert hue to CSS color
  const getColorFromHue = (hueValue: number) => {
    return `hsl(${hueValue}, 70%, 85%)` // Light pastel color
  }

  const getBorderColorFromHue = (hueValue: number) => {
    return `hsl(${hueValue}, 70%, 60%)` // Darker border
  }

  const getTextColorFromHue = (hueValue: number) => {
    return `hsl(${hueValue}, 70%, 25%)` // Dark text
  }

  const getHoverColorFromHue = (hueValue: number) => {
    return `hsl(${hueValue}, 70%, 75%)` // Slightly darker hover
  }

  const currentColor = {
    bg: getColorFromHue(hue),
    border: getBorderColorFromHue(hue),
    text: getTextColorFromHue(hue),
    hover: getHoverColorFromHue(hue)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return
    
    setIsDragging(true)
    const rect = noteRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
    
    // Bring to front
    const maxZIndex = Math.max(...document.querySelectorAll('.sticky-note').length > 0 
      ? Array.from(document.querySelectorAll('.sticky-note')).map(el => parseInt(getComputedStyle(el).zIndex) || 0)
      : [0]
    )
    dispatch(updateStickyNotePosition({
      id: note.id,
      position: note.position || { x: 0, y: 0 },
      zIndex: maxZIndex + 1
    }))
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    dispatch(updateStickyNotePosition({
      id: note.id,
      position: { x: newX, y: newY },
      zIndex: note.zIndex || 1
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleSave = () => {
    if (text.trim()) {
      dispatch(updateStickyNote({
        ...note,
        text: text.trim()
      }))
    } else {
      setText(note.text) // Restore original text if empty
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      setText(note.text) // Restore original text
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteStickyNote(note.id))
  }

  const handleColorChange = (newHue: number[]) => {
    const hueValue = newHue[0]
    setHue(hueValue)
    dispatch(updateStickyNoteColor({
      id: note.id,
      color: `hsl(${hueValue}, 70%, 85%)`
    }))
  }

  const startEditing = () => {
    setIsEditing(true)
    setText(note.text)
    // Focus the textarea after a brief delay to ensure it's rendered
    setTimeout(() => {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    }, 10)
  }

  // Initialize hue from note color if it exists
  useEffect(() => {
    if (note.color && note.color.startsWith('hsl')) {
      const match = note.color.match(/hsl\((\d+)/)
      if (match) {
        setHue(parseInt(match[1]))
      }
    }
  }, [note.color])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  const position = note.position || { x: 0, y: 0 }
  const zIndex = note.zIndex || 1

  return (
    <div
      ref={noteRef}
      className="sticky-note absolute cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
        transform: isDragging ? 'rotate(2deg)' : 'rotate(0deg)',
        transition: isDragging ? 'none' : 'transform 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        className="border-2 rounded-lg shadow-lg p-3 w-64 min-h-36 relative"
        style={{
          backgroundColor: currentColor.bg,
          borderColor: currentColor.border
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentColor.border }}
          ></div>
          <div className="flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: currentColor.text
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = currentColor.hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Palette className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-4">
                  <div className="text-sm font-medium">Choose Color</div>
                  <div className="space-y-2">
                    <Slider
                      value={[hue]}
                      onValueChange={handleColorChange}
                      max={360}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div 
                    className="w-full h-8 rounded border"
                    style={{ backgroundColor: currentColor.bg }}
                  ></div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              style={{ 
                backgroundColor: 'transparent',
                color: currentColor.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentColor.hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              onClick={(e) => {
                e.stopPropagation()
                startEditing()
              }}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-red-300"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {isEditing ? (
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="min-h-20 text-sm resize-none"
            style={{
              backgroundColor: 'transparent',
              borderColor: currentColor.border,
              color: currentColor.text
            }}
            placeholder="Write your note... (Press Enter to save, Esc to cancel)"
            autoFocus
          />
        ) : (
          <div 
            className={`text-sm leading-relaxed ${!note.text ? 'cursor-text' : ''}`}
            style={{ color: currentColor.text }}
            onClick={!note.text ? (e) => {
              e.stopPropagation()
              startEditing()
            } : undefined}
          >
            {note.text || "Click to add text..."}
          </div>
        )}
      </div>
    </div>
  )
} 