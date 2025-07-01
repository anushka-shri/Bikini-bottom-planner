"use client"
import { useState, useMemo } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calculator, ChevronDown } from "lucide-react"
import { PlannerItemType } from "./types"

interface ExpenseTrackerProps {
  items: PlannerItemType[]
}

export function ExpenseTracker({ items }: ExpenseTrackerProps) {
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