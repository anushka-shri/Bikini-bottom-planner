import Link from "next/link"
import { ClipboardList, Search, Trees } from "lucide-react"
import { Fish, Waves } from "lucide-react";



export default function HomePage() {
  return (
    
    <div className="container py-8 sm:py-12 md:py-16 text-center">
      <p
        className="font-bold uppercase text-[1.25rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-12"
        style={{
          fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif",
          color: '#FFFF31',
          WebkitTextStroke: '1.5px #0099cc', // blue outline
          textShadow: '2px 2px 0 #0099cc, 4px 4px 0 #005577', // playful shadow
          letterSpacing: '0.08em',
        }}
      >
        Plan your next adventure.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24">
        <Link href="/itineraries" className="btn-custom btn-planner">
          <span>📝</span> Plan Your Itinerary
        </Link>
        <Link href="/vacation-finder" className="btn-custom btn-finder">
          <span>🏝️</span> Find Vacation Spot
        </Link>
      </div>

      <div className="mx-auto max-w-[85%]">
        
        <div className="mt-16 md:mt-24">
          <div className="mx-auto w-[80%]">
            <div className="rounded-xl bg-white/20 backdrop-blur-sm p-8 border-4 border-yellow-100 shadow-xl relative">
              {/* Coral decoration */}
              <div className="absolute -top-10 -right-6 text-4xl animate-float">🐙</div>
              <div className="absolute -bottom-8 -left-6 text-4xl animate-float-slow">🐠</div>

              <h2 className="text-2xl font-bold mb-4 text-sponge-yellow drop-shadow-md">How It Works</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/30 rounded-lg p-4 border-2 border-sponge-blue transform hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="text-lg font-bold mb-2">Plan Your Trip</h3>
                  <p>Organize your adventures with our Krusty Planner. Add activities, bookings, and track expenses!</p>
                </div>

                <div className="bg-white/30 rounded-lg p-4 border-2 border-sponge-blue transform hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🔍</div>
                  <h3 className="text-lg font-bold mb-2">Find Destinations</h3>
                  <p>Tell us your budget and preferences, and we'll find the perfect vacation spots!</p>
                </div>

                <div className="bg-white/30 rounded-lg p-4 border-2 border-sponge-blue transform hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🏝️</div>
                  <h3 className="text-lg font-bold mb-2">Enjoy Your Vacation</h3>
                  <p>Have a vacation as fun as a day with SpongeBob and Patrick!</p>
                </div>
              </div>
            </div>
            <div className="text-center text-white text-lg mt-8">
              <p className="italic">"F is for Friends who plan trips together!"</p>
            </div>
          </div>
        </div>
        

        {/* Floating characters */}
        {/* <div className="absolute bottom-20 right-10 text-5xl animate-float-slow hidden md:block">🧽</div>
        <div className="absolute top-20 left-10 text-5xl animate-float hidden md:block">⭐</div> */}
      </div>
    </div>
  )
}
