"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { PlannerItem } from "./planner-item"
import { PlannerItemType } from "./types"

interface PlannerTimelineProps {
  items: PlannerItemType[]
  updateItem: (item: PlannerItemType) => void
  deleteItem: (id: string) => void
  onReorder: (items: PlannerItemType[]) => void
}

export function PlannerTimeline({ items, updateItem, deleteItem, onReorder }: PlannerTimelineProps) {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      const reorderedItems = arrayMove(items, oldIndex, newIndex)
      onReorder(reorderedItems)
    }
  }

  if (items.length === 0) {
    return (
      <Card className="text-center p-8 underwater-card">
        <CardTitle className="text-xl text-gray-700 mb-4">No items in your itinerary yet!</CardTitle>
        <CardContent>
          <p className="text-gray-600 mb-4">Click "Add Item" to start planning your journey.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="relative pl-4">
          {items.map((item) => (
            <PlannerItem key={item.id} item={item} updateItem={updateItem} deleteItem={deleteItem} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
} 