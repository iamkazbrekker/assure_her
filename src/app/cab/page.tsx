"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MapPin, Circle, Navigation, Car, Bike, ShieldCheck } from "lucide-react"
import Link from "next/link"
import SOSButton from "@/components/ui/sos"
import CommunityCorner from "@/components/communityDiv"

export default function CabPage() {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [selectedRide, setSelectedRide] = useState("Assure Cab")

  return (
    <div className="relative overflow-hidden h-screen bg-white">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/background-doodle.png'),url('/background-doodle.png')] bg-no-repeat bg-size-[100%_50%,100%_50%] bg-position-[top,bottom] opacity-20 pointer-events-none md:bg-[url('/background-doodle.png')] md:bg-repeat md:bg-size-[150px]"
      />

      {/* Default Input View */}
      <div className="relative z-10 h-full flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex flex-row items-center p-5 pb-3 sticky top-0 z-20 bg-white/80 backdrop-blur-md">
          <Link href="/" className="mr-3 p-1 shrink-0">
            <ArrowLeft className="text-green-800" size={26} />
          </Link>
          <h1 className="text-xl font-bold text-green-800 flex-1">Book exactly what you need</h1>
          <CommunityCorner />
        </header>

        <main className="flex flex-col p-5">
          {/* Location Input Card */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col gap-5 relative z-20 text-black">

            {/* Inputs with vertical connecting line */}
            <div className="relative flex flex-col gap-4">
              {/* Connecting Line */}
              <div className="absolute left-4 top-5 bottom-8 w-0.5 bg-gray-300" />

              <div className="flex items-center gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 z-10">
                  <Circle size={12} className="text-gray-500 fill-current" />
                </div>
                <input
                  type="text"
                  placeholder="Current Location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-gray-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-800 font-medium placeholder:text-gray-500"
                />
              </div>

              <div className="flex items-center gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 z-10">
                  <MapPin size={16} className="text-green-700" />
                </div>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full bg-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 font-bold placeholder:text-gray-600"
                />
              </div>
            </div>

            <button
              onClick={() => setIsSearching(true)}
              disabled={!pickup || !dropoff}
              className="w-full mt-1 bg-green-700 text-white rounded-xl py-3.5 font-bold flex justify-center items-center gap-2 hover:bg-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <Navigation size={18} /> Find Ride
            </button>
          </div>

          {/* Recent Places */}
          <div className="mt-8 px-2 pb-24 text-black">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Saved Places</h3>
            <div className="flex flex-col">
              <div
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition"
                onClick={() => { setDropoff("Central Mall"); setPickup("Home") }}
              >
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                  <MapPin size={22} className="text-green-700" />
                </div>
                <div className="border-b border-gray-100 pb-4 pt-1 flex-1">
                  <h4 className="font-bold text-gray-900">Central Mall</h4>
                  <p className="text-sm text-gray-500">Sector 12, Main Road</p>
                </div>
              </div>

              <div
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition mt-2"
                onClick={() => { setDropoff("City Metro Station"); setPickup("Home") }}
              >
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                  <Navigation size={22} className="text-blue-600" />
                </div>
                <div className="pb-4 pt-1 flex-1">
                  <h4 className="font-bold text-gray-900">City Metro Station</h4>
                  <p className="text-sm text-gray-500">Gate 3, Downtown Transit</p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Map & Booking Options Overlay (Activated on Search) */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-gray-100 flex flex-col"
          >
            {/* Map Back Button Overlay */}
            <button
              onClick={() => setIsSearching(false)}
              className="absolute top-6 left-5 z-50 bg-white p-3 rounded-full shadow-lg"
            >
              <ArrowLeft size={22} className="text-gray-800" />
            </button>

            {/* Top Map / Video Area */}
            <div className="h-[45vh] w-full bg-black relative shrink-0 shadow-inner pointer-events-none">
              {/* YouTube Video Placeholder */}
              <iframe
                src="https://www.youtube.com/embed/Aq5WXmQQooo?si=mr2_mnm4FNJ8uJUT&autoplay=1&mute=1&controls=0&loop=1&playlist=Aq5WXmQQooo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full opacity-90"
              />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Bottom Sheet - Ride Options */}
            <div className="flex-1 bg-white rounded-t-[32px] -mt-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col pt-3 pb-0">

              {/* Header & Drag Handle */}
              <div className="px-5 pb-3">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 text-center">Choose a ride</h2>
              </div>

              {/* Options List */}
              <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-32">

                {/* Option 1: Cab */}
                <div
                  onClick={() => setSelectedRide("Assure Cab")}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors ${selectedRide === "Assure Cab" ? "bg-green-50 border-2 border-green-600" : "bg-white border border-gray-200 hover:border-green-400"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <Car size={32} className="text-gray-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[17px] font-bold text-gray-900">Assure Cab</h3>
                        <span className="bg-green-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wide">Safe</span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium mt-0.5">3 min • Dropoff at 4:15 PM</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">$12.50</span>
                </div>

                {/* Option 2: Rickshaw */}
                <div
                  onClick={() => setSelectedRide("Auto Rickshaw")}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors ${selectedRide === "Auto Rickshaw" ? "bg-green-50 border-2 border-green-600" : "bg-white border border-gray-200 hover:border-green-400"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <Bike size={32} className="text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-gray-900">Auto Rickshaw</h3>
                      <p className="text-sm text-gray-500 font-medium mt-0.5">1 min • Dropoff at 4:20 PM</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">$5.00</span>
                </div>

                {/* Option 3: Premium */}
                <div
                  onClick={() => setSelectedRide("Premium SUV")}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors ${selectedRide === "Premium SUV" ? "bg-green-50 border-2 border-green-600" : "bg-white border border-gray-200 hover:border-green-400"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <ShieldCheck size={32} className="text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-gray-900">Premium SUV</h3>
                      <p className="text-sm text-gray-500 font-medium mt-0.5">6 min • Dropoff at 4:10 PM</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">$24.00</span>
                </div>

              </div>

              {/* Sticky Confirm Button */}
              <div className="absolute bottom-0 left-0 right-0 p-5 pt-4 bg-white border-t border-gray-100 z-20">
                <button className="w-full bg-green-700 text-white rounded-xl py-4 font-bold text-lg flex justify-center items-center gap-2 hover:bg-green-800 shadow-[0_4px_20px_rgba(21,128,61,0.3)] transition-all active:scale-[0.98]">
                  Confirm {selectedRide}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SOSButton shifted={isSearching} />

    </div>
  )
}
