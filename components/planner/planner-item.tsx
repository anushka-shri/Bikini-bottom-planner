"use client"
import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
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
  Save,
  X,
  GripVertical,
} from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDropzone } from 'react-dropzone'
import { PlannerItemType, Expense, DocumentFile } from "./types"

interface PlannerItemProps {
  item: PlannerItemType
  updateItem: (item: PlannerItemType) => void
  deleteItem: (id: string) => void
}

export function PlannerItem({ item, updateItem, deleteItem }: PlannerItemProps) {
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