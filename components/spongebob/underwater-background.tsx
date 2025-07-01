export default function UnderwaterBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Main underwater gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-300 via-blue-500 to-purple-400" />

      {/* Floating Jellyfish */}
      <div className="floating-jellyfish jellyfish-1 absolute top-1/5 left-1/5 w-12 h-16 opacity-70">
        <svg viewBox="0 0 60 80" className="w-full h-full">
          {/* Jellyfish bell */}
          <ellipse cx="30" cy="25" rx="25" ry="20" fill="#FF69B4" opacity="0.8" />
          <ellipse cx="30" cy="25" rx="20" ry="15" fill="#FFB6C1" opacity="0.6" />
          {/* Jellyfish tentacles */}
          <path d="M15 40 Q12 50, 15 60 Q18 70, 15 80" stroke="#FF69B4" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M25 40 Q22 55, 25 65 Q28 75, 25 80" stroke="#FF69B4" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M35 40 Q32 55, 35 65 Q38 75, 35 80" stroke="#FF69B4" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M45 40 Q42 50, 45 60 Q48 70, 45 80" stroke="#FF69B4" strokeWidth="2" fill="none" opacity="0.7" />
        </svg>
      </div>

      <div className="floating-jellyfish jellyfish-2 absolute top-1/3 right-1/4 w-10 h-14 opacity-60">
        <svg viewBox="0 0 50 70" className="w-full h-full">
          <ellipse cx="25" cy="20" rx="20" ry="15" fill="#00CED1" opacity="0.8" />
          <ellipse cx="25" cy="20" rx="15" ry="10" fill="#AFEEEE" opacity="0.6" />
          <path d="M12 32 Q10 42, 12 52 Q14 62, 12 70" stroke="#00CED1" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M20 32 Q18 47, 20 57 Q22 67, 20 70" stroke="#00CED1" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M30 32 Q28 47, 30 57 Q32 67, 30 70" stroke="#00CED1" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M38 32 Q36 42, 38 52 Q40 62, 38 70" stroke="#00CED1" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>
      </div>

      <div className="floating-jellyfish jellyfish-3 absolute top-2/3 left-1/3 w-8 h-12 opacity-65">
        <svg viewBox="0 0 40 60" className="w-full h-full">
          <ellipse cx="20" cy="15" rx="15" ry="12" fill="#9370DB" opacity="0.8" />
          <ellipse cx="20" cy="15" rx="10" ry="8" fill="#DDA0DD" opacity="0.6" />
          <path d="M10 25 Q8 35, 10 45 Q12 55, 10 60" stroke="#9370DB" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M16 25 Q14 40, 16 50 Q18 60, 16 60" stroke="#9370DB" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M24 25 Q22 40, 24 50 Q26 60, 24 60" stroke="#9370DB" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M30 25 Q28 35, 30 45 Q32 55, 30 60" stroke="#9370DB" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>
      </div>

      {/* Floating Starfish */}
      <div className="floating-starfish starfish-1 absolute top-1/4 right-1/3 w-10 h-10 opacity-75">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 10 L60 35 L85 35 L67 52 L75 77 L50 62 L25 77 L33 52 L15 35 L40 35 Z" fill="#FFD700" />
          <circle cx="50" cy="50" r="8" fill="#FFA500" />
        </svg>
      </div>

      <div className="floating-starfish starfish-2 absolute top-1/2 left-1/6 w-8 h-8 opacity-65">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 10 L60 35 L85 35 L67 52 L75 77 L50 62 L25 77 L33 52 L15 35 L40 35 Z" fill="#FF69B4" />
          <circle cx="50" cy="50" r="6" fill="#FF1493" />
        </svg>
      </div>

      <div className="floating-starfish starfish-3 absolute top-3/4 right-1/5 w-12 h-12 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 10 L60 35 L85 35 L67 52 L75 77 L50 62 L25 77 L33 52 L15 35 L40 35 Z" fill="#32CD32" />
          <circle cx="50" cy="50" r="10" fill="#228B22" />
        </svg>
      </div>

      {/* Floating Fish */}
      <div className="floating-fish fish-1 absolute top-1/4 left-1/4 w-8 h-6 opacity-70">
        <svg viewBox="0 0 40 30" className="w-full h-full">
          <ellipse cx="20" cy="15" rx="15" ry="8" fill="#FFD700" />
          <path d="M5 15 L0 10 L0 20 Z" fill="#FFD700" />
          <circle cx="25" cy="12" r="2" fill="#000" />
          <path d="M30 8 Q35 15, 30 22" stroke="#FFA500" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="floating-fish fish-2 absolute top-1/3 right-1/3 w-6 h-4 opacity-60">
        <svg viewBox="0 0 30 20" className="w-full h-full">
          <ellipse cx="15" cy="10" rx="12" ry="6" fill="#FF69B4" />
          <path d="M3 10 L0 6 L0 14 Z" fill="#FF69B4" />
          <circle cx="20" cy="8" r="1.5" fill="#000" />
        </svg>
      </div>

      <div className="floating-fish fish-3 absolute top-1/2 left-1/6 w-10 h-7 opacity-65">
        <svg viewBox="0 0 50 35" className="w-full h-full">
          <ellipse cx="25" cy="17.5" rx="18" ry="10" fill="#00CED1" />
          <path d="M7 17.5 L0 12 L0 23 Z" fill="#00CED1" />
          <circle cx="32" cy="14" r="2.5" fill="#000" />
          <path d="M38 10 Q45 17.5, 38 25" stroke="#008B8B" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="floating-fish fish-4 absolute top-2/3 right-1/4 w-7 h-5 opacity-55">
        <svg viewBox="0 0 35 25" className="w-full h-full">
          <ellipse cx="17.5" cy="12.5" rx="14" ry="7" fill="#32CD32" />
          <path d="M3.5 12.5 L0 8 L0 17 Z" fill="#32CD32" />
          <circle cx="24" cy="10" r="2" fill="#000" />
        </svg>
      </div>

      {/* More Coral Formations */}
      <div className="absolute bottom-8 left-8">
        <svg width="60" height="80" viewBox="0 0 60 80" className="text-red-400 opacity-70">
          <path d="M10 80 Q10 60, 15 50 Q20 40, 25 35 Q30 30, 35 35 Q40 40, 45 50 Q50 60, 50 80" fill="currentColor" />
          <path d="M15 70 Q15 55, 20 45 Q25 35, 30 40 Q35 45, 40 55 Q45 65, 45 70" fill="currentColor" opacity="0.8" />
          <circle cx="20" cy="45" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="35" cy="40" r="2" fill="currentColor" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-12 right-16">
        <svg width="50" height="70" viewBox="0 0 50 70" className="text-purple-400 opacity-60">
          <path d="M5 70 Q5 50, 10 40 Q15 30, 20 25 Q25 20, 30 25 Q35 30, 40 40 Q45 50, 45 70" fill="currentColor" />
          <path d="M10 60 Q10 45, 15 35 Q20 25, 25 30 Q30 35, 35 45 Q40 55, 40 60" fill="currentColor" opacity="0.8" />
          <circle cx="15" cy="35" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-6 left-1/3">
        <svg width="40" height="60" viewBox="0 0 40 60" className="text-orange-400 opacity-65">
          <path d="M5 60 Q5 45, 8 35 Q12 25, 16 20 Q20 15, 24 20 Q28 25, 32 35 Q35 45, 35 60" fill="currentColor" />
          <circle cx="12" cy="30" r="2" fill="currentColor" opacity="0.7" />
          <circle cx="25" cy="25" r="2" fill="currentColor" opacity="0.7" />
        </svg>
      </div>

      {/* Additional Coral Types */}
      <div className="absolute bottom-10 left-2/3">
        <svg width="45" height="65" viewBox="0 0 45 65" className="text-pink-400 opacity-60">
          <path d="M5 65 Q8 50, 12 40 Q16 30, 20 25 Q25 20, 30 25 Q34 30, 38 40 Q42 50, 40 65" fill="currentColor" />
          <path d="M10 55 Q13 45, 17 35 Q21 25, 25 30 Q29 35, 33 45 Q37 55, 35 55" fill="currentColor" opacity="0.8" />
          <circle cx="15" cy="35" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="28" cy="30" r="2" fill="currentColor" opacity="0.7" />
        </svg>
      </div>

      <div className="absolute bottom-4 right-2/3">
        <svg width="35" height="50" viewBox="0 0 35 50" className="text-cyan-400 opacity-55">
          <path d="M5 50 Q7 40, 10 30 Q13 20, 17 15 Q22 10, 27 15 Q30 20, 32 30 Q33 40, 30 50" fill="currentColor" />
          <circle cx="12" cy="25" r="1.5" fill="currentColor" opacity="0.8" />
          <circle cx="23" cy="20" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {/* Floating flower patterns */}
      <div className="absolute inset-0">
        {/* Large flowers */}
        <div className="absolute top-20 left-1/4 w-16 h-16 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path
              d="M50 20 C30 20, 20 30, 20 50 C20 30, 30 20, 50 20 C70 20, 80 30, 80 50 C80 70, 70 80, 50 80 C30 80, 20 70, 20 50 C20 70, 30 80, 50 80 C50 60, 60 50, 80 50 C60 50, 50 40, 50 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-32 right-1/3 w-12 h-12 opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-200">
            <path
              d="M50 20 C30 20, 20 30, 20 50 C20 30, 30 20, 50 20 C70 20, 80 30, 80 50 C80 70, 70 80, 50 80 C30 80, 20 70, 20 50 C20 70, 30 80, 50 80 C50 60, 60 50, 80 50 C60 50, 50 40, 50 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/6 w-14 h-14 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-200">
            <path
              d="M50 20 C30 20, 20 30, 20 50 C20 30, 30 20, 50 20 C70 20, 80 30, 80 50 C80 70, 70 80, 50 80 C30 80, 20 70, 20 50 C20 70, 30 80, 50 80 C50 60, 60 50, 80 50 C60 50, 50 40, 50 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-2/3 right-1/4 w-10 h-10 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full text-teal-200">
            <path
              d="M50 20 C30 20, 20 30, 20 50 C20 30, 30 20, 50 20 C70 20, 80 30, 80 50 C80 70, 70 80, 50 80 C30 80, 20 70, 20 50 C20 70, 30 80, 50 80 C50 60, 60 50, 80 50 C60 50, 50 40, 50 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Sandy ocean floor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-200 via-yellow-100 to-transparent opacity-80" />

      {/* Seaweed */}
      <div className="absolute bottom-0 left-1/4">
        <svg width="20" height="100" viewBox="0 0 20 100" className="text-green-500 opacity-50">
          <path
            d="M10 100 Q5 90, 8 80 Q12 70, 6 60 Q10 50, 14 40 Q8 30, 12 20 Q16 10, 10 0"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-1/3">
        <svg width="15" height="80" viewBox="0 0 15 80" className="text-green-600 opacity-45">
          <path
            d="M7 80 Q3 70, 6 60 Q10 50, 4 40 Q8 30, 12 20 Q6 10, 7 0"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Scattered objects on ocean floor */}
      <div className="absolute bottom-4 left-1/2 w-4 h-3 bg-gray-400 rounded-full opacity-60" />
      <div className="absolute bottom-6 left-2/3 w-3 h-2 bg-gray-500 rounded opacity-50" />
      <div className="absolute bottom-3 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-70" />
      <div className="absolute bottom-8 left-1/6 w-5 h-2 bg-pink-300 rounded opacity-55" />

      {/* Animated bubbles */}
      <div className="bubbles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Watermark: SpongeBob's Pineapple House */}
      <div className="absolute bottom-0 left-0 z-0 opacity-10 pointer-events-none select-none">
        <svg width="180" height="220" viewBox="0 0 180 220" fill="none" className="w-44 h-56">
          {/* Pineapple body */}
          <ellipse cx="90" cy="140" rx="60" ry="80" fill="#FFB347" stroke="#E59400" strokeWidth="6" />
          {/* Pineapple texture */}
          <g stroke="#E59400" strokeWidth="3">
            <path d="M50 80 Q90 180 130 80" />
            <path d="M30 120 Q90 200 150 120" />
            <path d="M60 60 Q90 120 120 60" />
            <path d="M70 180 Q90 210 110 180" />
          </g>
          {/* Door */}
          <ellipse cx="90" cy="200" rx="18" ry="24" fill="#6EC6CA" stroke="#2A6F77" strokeWidth="4" />
          {/* Windows */}
          <ellipse cx="50" cy="140" rx="12" ry="16" fill="#6EC6CA" stroke="#2A6F77" strokeWidth="3" />
          <ellipse cx="130" cy="140" rx="12" ry="16" fill="#6EC6CA" stroke="#2A6F77" strokeWidth="3" />
          {/* Leaves */}
          <g>
            <path d="M90 60 Q80 30 100 20 Q110 10 120 40" stroke="#4CAF50" strokeWidth="8" fill="none" />
            <path d="M90 60 Q100 10 80 30 Q70 50 90 60" stroke="#388E3C" strokeWidth="8" fill="none" />
            <path d="M90 60 Q70 0 110 10 Q130 20 90 60" stroke="#81C784" strokeWidth="6" fill="none" />
          </g>
        </svg>
      </div>

      
    </div>
  )
}
