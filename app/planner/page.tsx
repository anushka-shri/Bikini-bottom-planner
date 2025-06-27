"use client"
import { useState, useMemo } from "react"
import type React from "react"
import plannerData from "../../data.json"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  PlusCircle,
  Trash2,
  Edit3,
  ChevronDown,
  DollarSign,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  Plane,
  Hotel,
  BookOpen,
  Download,
  Calculator,
  Save,
  X,
  GripVertical,
} from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDropzone } from 'react-dropzone'

type Expense = { id: string; description: string; amount: number }
type DocumentFile = { id: string; name: string; type: string }

interface PlannerItemType {
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

interface PlannerData {
  plannerItems: PlannerItemType[]
}

function SortablePlannerItem({
  item,
  updateItem,
  deleteItem,
}: { item: PlannerItemType; updateItem: (item: PlannerItemType) => void; deleteItem: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState<PlannerItemType>(item)

  const handleInputChange = (field: keyof PlannerItemType, value: any) => {
    setEditedItem((prev) => ({ ...prev, [field]: value }))
  }

  const handleExpenseChange = (index: number, field: keyof Expense, value: any) => {
    const newExpenses = [...editedItem.expenses]
    newExpenses[index] = { ...newExpenses[index], [field]: field === "amount" ? Number.parseFloat(value) || 0 : value }
    setEditedItem((prev) => ({ ...prev, expenses: newExpenses }))
  }

  const addExpenseField = () => {
    setEditedItem((prev) => ({
      ...prev,
      expenses: [...prev.expenses, { id: `exp${Date.now()}`, description: "", amount: 0 }],
    }))
  }

  const removeExpenseField = (index: number) => {
    setEditedItem((prev) => ({ ...prev, expenses: prev.expenses.filter((_, i) => i !== index) }))
  }

  const addPlaceToGoField = () => {
    setEditedItem((prev) => ({ ...prev, placesToGo: [...prev.placesToGo, ""] }))
  }

  const removePlaceToGoField = (index: number) => {
    setEditedItem((prev) => ({ ...prev, placesToGo: prev.placesToGo.filter((_, i) => i !== index) }))
  }

  const handlePlaceToGoChange = (index: number, value: string) => {
    const newPlaces = [...editedItem.placesToGo]
    newPlaces[index] = value
    setEditedItem((prev) => ({ ...prev, placesToGo: newPlaces }))
  }

  const addDocumentField = () => {
    setEditedItem((prev) => ({
      ...prev,
      documents: [...prev.documents, { id: `doc${Date.now()}`, name: "", type: "" }],
    }))
  }

  const removeDocumentField = (index: number) => {
    setEditedItem((prev) => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }))
  }

  const handleDocumentChange = (index: number, field: keyof DocumentFile, value: string) => {
    const newDocs = [...editedItem.documents]
    newDocs[index] = { ...newDocs[index], [field]: value }
    setEditedItem((prev) => ({ ...prev, documents: newDocs }))
  }

  const saveChanges = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateItem(editedItem)
    setIsEditing(false)
  }

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditedItem(item)
    setIsEditing(false)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(item.id)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditedItem(item)
    setIsEditing(true)
    setIsOpen(true)
  }

  const toggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newStatus = item.status === "pending" ? "booked" : "pending"
    updateItem({ ...item, status: newStatus })
  }

  const getStatusIcon = () => {
    return item.status === "booked" ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <Clock className="w-4 h-4 text-yellow-500" />
    )
  }

  const getTypeIcon = () => {
    switch (item.type) {
      case "travel":
        return <Plane className="w-4 h-4 text-blue-500" />
      case "stay":
        return <Hotel className="w-4 h-4 text-purple-500" />
      case "booking":
        return <BookOpen className="w-4 h-4 text-indigo-500" />
      case "event":
      default:
        return <MapPin className="w-4 h-4 text-red-500" />
    }
  }

  // --- Dropzone for documents ---
  const onDrop = (acceptedFiles: File[]) => {
    const newDocs = acceptedFiles.map((file) => ({
      id: `doc${Date.now()}-${file.name}`,
      name: file.name,
      type: file.type || file.name.split('.').pop() || '',
      file, // keep the file object for future use (e.g., upload)
    }))
    setEditedItem((prev) => ({ ...prev, documents: [...prev.documents, ...newDocs] }))
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true,
  })

  return (
    <div ref={setNodeRef} style={style} className="relative mb-6">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 timeline-line -translate-x-1/2" />
      <div className="absolute left-0 top-4 w-3 h-3 timeline-dot rounded-full -translate-x-1/2 -ml-1.5" />

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="ml-8 border border-white/30 rounded-lg shadow-lg underwater-card hover:shadow-xl transition-all duration-300"
      >
        <div className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white/90 rounded-t-md backdrop-blur-sm">
          <div className="flex items-center gap-2 flex-grow">
            {/* Drag Handle - Only this area triggers drag */}
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded transition-colors"
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            {getTypeIcon()}
            <span className="font-medium text-gray-800">{item.title}</span>
            {item.date && <span className="text-sm text-gray-500">({item.date})</span>}
            <button
              onClick={toggleStatus}
              className="ml-2 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {getStatusIcon()} {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit3 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        {/* future collapsible content */}
        <CollapsibleContent className="p-4 space-y-4 border-t border-white/20 bg-transparent backdrop-blur-sm rounded-b-md">
          {isEditing ? (
            <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl p-6 bg-gradient-to-br from-white/10 to-transparent border border-blue-200">
              <h3 className="font-bold text-2xl text-blue-900 mb-6 flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-blue-400" /> Editing: {item.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor={`title-${item.id}`}>Title</Label>
                  <Input
                    id={`title-${item.id}`}
                    className="w-full mt-1 focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80"
                    value={editedItem.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`type-${item.id}`}>Type</Label>
                  <Select value={editedItem.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="w-full mt-1 focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="stay">Stay</SelectItem>
                      <SelectItem value="travel">Travel Mode</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`date-${item.id}`}>Date</Label>
                  <Input
                    type="date"
                    id={`date-${item.id}`}
                    className="w-full mt-1 focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80"
                    value={editedItem.date || ""}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`status-${item.id}`}>Status</Label>
                  <Select value={editedItem.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="w-full mt-1 focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="booked">Booked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`notes-${item.id}`} className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
                    📝 Add Places to visit, Important links
                  </Label>
                  <Textarea
                    id={`notes-${item.id}`}
                    className="w-full mt-1 focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80"
                    value={editedItem.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <Label className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
                    💸 Expenses
                  </Label>
                  <div className="space-y-2">
                    {editedItem.expenses.map((exp, index) => (
                      <div key={exp.id || index} className="flex gap-2 items-center">
                        <Input
                          placeholder="Description"
                          className="w-full focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80"
                          value={exp.description}
                          onChange={(e) => handleExpenseChange(index, "description", e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="Amount"
                          className="w-24 focus:ring-2 focus:ring-blue-400 rounded-lg bg-white/80"
                          value={exp.amount}
                          onChange={(e) => handleExpenseChange(index, "amount", e.target.value)}
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeExpenseField(index)}>
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addExpenseField} className="mt-1 hover:bg-blue-100 rounded-full">
                      <PlusCircle size={16} className="mr-1" /> Add Expense
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
                    📎 Documents
                  </Label>
                  <div {...getRootProps()} className={`border-2 border-dashed border-blue-300 rounded-lg p-4 text-center cursor-pointer transition-colors hover:bg-blue-50 ${isDragActive ? 'bg-blue-100 border-blue-400' : 'bg-white/70 border-blue-300'}`}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag & drop PDF, DOC, PNG, or JPEG files here</p>
                    )}
                  </div>
                  {editedItem.documents.length > 0 && (
                    <ul className="list-disc list-inside ml-4 text-gray-700 text-sm mt-2">
                      {editedItem.documents.map((doc, index) => (
                        <li key={doc.id || index} className="flex items-center gap-2">
                          <span>{doc.name} ({doc.type})</span>
                          <Button variant="ghost" size="icon" onClick={() => removeDocumentField(index)}>
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <hr className="my-4 border-blue-200 md:col-span-3" />
                <div className="flex gap-2 pt-2 md:col-span-3 justify-end">
                  <Button onClick={saveChanges} className="bg-green-600 hover:bg-green-700 text-white shadow-md rounded-full px-8 py-2">
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button variant="outline" onClick={cancelEdit} className="shadow-md rounded-full px-8 py-2">
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>

              {item.expenses.length > 0 && (
                <div>
                  <h4 className="font-semibold flex items-center gap-1 text-gray-800 text-sm mb-1">
                    <DollarSign size={14} />
                    Expenses:
                  </h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                    {item.expenses.map((exp) => (
                      <li key={exp.id}>
                        {exp.description}: ${exp.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.placesToGo.length > 0 && (
                <div>
                  <h4 className="font-semibold flex items-center gap-1 text-gray-800 text-sm mb-1">
                    <MapPin size={14} />
                    Places to Go:
                  </h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                    {item.placesToGo.map((place, i) => (
                      <li key={i}>{place}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.documents.length > 0 && (
                <div>
                  <h4 className="font-semibold flex items-center gap-1 text-gray-800 text-sm mb-1">
                    <FileText size={14} />
                    Documents:
                  </h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                    {item.documents.map((doc) => (
                      <li key={doc.id}>
                        {doc.name} ({doc.type}) <span className="text-xs text-gray-500"></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </CollapsibleContent>

      </Collapsible>
    </div>
  )
}

function StyledExpenseTracker({ items }: { items: PlannerItemType[] }) {
  const [isOpen, setIsOpen] = useState(false)

  const expenseData = useMemo(() => {
    const allExpenses = items.flatMap((item) => item.expenses)
    const totalExpenses = allExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    const bookedExpenses = items
      .filter((item) => item.status === "booked")
      .flatMap((item) => item.expenses)
      .reduce((sum, exp) => sum + exp.amount, 0)
    const pendingExpenses = items
      .filter((item) => item.status === "pending")
      .flatMap((item) => item.expenses)
      .reduce((sum, exp) => sum + exp.amount, 0)

    return {
      total: totalExpenses,
      booked: bookedExpenses,
      pending: pendingExpenses,
      expensesByType: items.reduce(
        (acc, item) => {
          const typeTotal = item.expenses.reduce((sum, exp) => sum + exp.amount, 0)
          if (typeTotal > 0) {
            acc[item.type] = (acc[item.type] || 0) + typeTotal
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    }
  }, [items])

  return (
    <div
      // className="btn-custom"
      style={{ backgroundColor: "#a5d8ff", padding: "1rem", borderRadius: "1rem", border: "3px solid #1e3a8a" }}

      className="w-full max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-lg border border-blue-200 p-8"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full cursor-pointer">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-blue-800" />
              <span className="font-bold text-xl text-blue-800">Expense Tracker</span>
            </div>
            <div className="flex items-center gap-10 text-sm">
              <div className="text-center">
                <p className="text-blue-700 font-semibold">Total</p>
                <p className="font-bold text-blue-800 text-lg">${expenseData.total.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-blue-700 font-semibold">Booked</p>
                <p className="font-bold text-green-700 text-lg">${expenseData.booked.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-blue-700 font-semibold">Pending</p>
                <p className="font-bold text-yellow-700 text-lg">${expenseData.pending.toFixed(2)}</p>
              </div>
              <ChevronDown className="w-6 h-6 text-blue-800 transition-transform duration-300 data-[state=open]:rotate-180" />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-6 space-y-6">
          <hr className="border-blue-200" />
          <div>
            <h4 className="font-bold text-blue-800 mb-3 text-lg">📊 Expenses by Category</h4>
            <div className="space-y-2">
              {Object.keys(expenseData.expensesByType).length > 0 ? (
                Object.entries(expenseData.expensesByType).map(([type, amount]) => (
                  <div
                    key={type}
                    className="flex justify-between items-center p-3 bg-white/50 rounded-lg border-2 border-blue-600"
                  >
                    <span className="capitalize text-blue-800 font-semibold text-lg">{type}</span>
                    <span className="font-bold text-blue-800 text-lg">${amount.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <p className="text-blue-700 text-center py-4 font-semibold">No expenses categorized yet.</p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default function PlannerPage() {
  const [items, setItems] = useState<PlannerItemType[]>((plannerData as PlannerData).plannerItems)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const addNewItem = () => {
    const newItem: PlannerItemType = {
      id: `item-${Date.now()}`,
      title: "New Itinerary Item",
      type: "event",
      status: "pending",
      expenses: [],
      placesToGo: [],
      documents: [],
      date: new Date().toISOString().split("T")[0],
    }
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = (updatedItem: PlannerItemType) => {
    setItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }


  const exportToWord = () => {
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

  return (
    <div className="container py-8">
      {/* Main Timeline Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-md flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-yellow-300" />
            Itinerary Timeline
          </h1>

          <div className="flex gap-2">
            <Button onClick={addNewItem} className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2">
              <PlusCircle className="h-5 w-5" /> Add Item
            </Button>
            <Button onClick={exportToWord} variant="outline" className="bg-[#a5d8ff] border-2 border-[#1e3a8a] rounded-xl font-bold text-blue-900 px-5 py-2 hover:bg-blue-200 flex items-center gap-2">
              <Download className="h-5 w-5" /> Download
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="text-center p-8 underwater-card">
            <CardTitle className="text-xl text-gray-700 mb-4">No items in your itinerary yet!</CardTitle>
            <CardContent>
              <p className="text-gray-600 mb-4">Click "Add Item" to start planning your journey.</p>
            </CardContent>
          </Card>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="relative pl-4">
                {items.map((item) => (
                  <SortablePlannerItem key={item.id} item={item} updateItem={updateItem} deleteItem={deleteItem} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Styled Expense Tracker at Bottom */}
      <div className="w-[85%]">
        <StyledExpenseTracker items={items} />
      </div>
    </div>
  )
}
