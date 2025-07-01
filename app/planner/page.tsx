"use client"
import { useEffect } from "react"
import plannerData from "../../data.json"
import { 
  PlannerHeader, 
  PlannerTimeline, 
  ExpenseTracker
} from "@/components/planner"
import { useAppDispatch } from "@/lib/hooks"
import { setItems } from "@/lib/slices/plannerSlice"
import type { PlannerData } from "@/components/planner"

export default function PlannerPage() {
  const dispatch = useAppDispatch()

  // Initialize data from JSON file
  useEffect(() => {
    const data = plannerData as PlannerData
    dispatch(setItems(data.plannerItems))
  }, [dispatch])

  return (
    <div className="container py-8">
      {/* Main Timeline Section */}
      <div className="mb-8">
        <PlannerHeader />
        <PlannerTimeline />
      </div>

      {/* Styled Expense Tracker at Bottom */}
      <div className="w-[85%]">
        <ExpenseTracker />
      </div>
    </div>
  )
}
