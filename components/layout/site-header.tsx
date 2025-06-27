import Link from "next/link"


export default function SiteHeader() {
  return (
    <header className="top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-semibold text-gray-800">KrustyTrips</span>
        </Link>
        <Link href="/sign-in" className="flex items-center space-x-2">
          <span className="text-2xl font-semibold text-gray-800">Sign In</span>
        </Link>
        {/* Future Nav items can go here */}
      </div>
    </header>
  )
}
