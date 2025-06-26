import Link from "next/link"
import { ClipboardList, Search, Trees } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container py-8 sm:py-12 md:py-16 text-center">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-lg">
        Welcome!
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl mb-10 text-white/90 drop-shadow-md">Plan your next adventure.</p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24">
        <Link href="/planner" className="btn-custom btn-planner">
          <span>📝</span> Plan Your Itinerary
        </Link>
        <Link href="/vacation-finder" className="btn-custom btn-finder">
          <span>🏝️</span> Find Vacation Spot
        </Link>
      </div>

      <div className="mx-auto max-w-[85%]">
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-4xl sm:text-5xl mb-10 text-white drop-shadow-md font-bold">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="info-card p-6">
              <ClipboardList className="info-card-icon mx-auto" />
              <h3 className="text-2xl sm:text-3xl info-card-title">Plan Your Trip</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-2">
                Organize your adventures with our Planner. Add activities, bookings, and track expenses!
              </p>
            </div>
            <div className="info-card p-6">
              <Search className="info-card-icon mx-auto" />
              <h3 className="text-2xl sm:text-3xl info-card-title">Find Destinations</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-2">
                Tell us your budget and preferences, and we&apos;ll find the perfect vacation spots!
              </p>
            </div>
            <div className="info-card p-6">
              <Trees className="info-card-icon mx-auto" />
              <h3 className="text-2xl sm:text-3xl info-card-title">Enjoy Your Vacation</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-2">Have a great time!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
