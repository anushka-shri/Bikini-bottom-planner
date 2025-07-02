"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PlannerPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to itineraries page
    router.push('/itineraries')
  }, [router])

  return (
    <div className="container py-8">
      <div className="text-center">
        <div className="text-4xl mb-4">🧽</div>
        <p>Redirecting to your itineraries...</p>
      </div>
    </div>
  )
}
