"use client"

import { ActionCard } from "@/components/booking"
import CommunityCorner from "@/components/communityDiv"
import SOSButton from "@/components/ui/sos"
import { Play, Plus, Bus, ArrowLeft, PersonStanding, X, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BusPage() {
  const [isRideActive, setIsRideActive] = useState(false)

  return (
    <div className="relative overflow-hidden h-screen bg-white">

      <div
        className="
          absolute inset-0
          bg-[url('/background-doodle.png'),url('/background-doodle.png')]
          bg-no-repeat
          bg-size-[100%_50%,100%_50%]
          bg-position-[top,bottom]
          opacity-20

          md:bg-[url('/background-doodle.png')]
          md:bg-repeat
          md:bg-size-[150px]
          pointer-events-none
        "
      />

      <div className="relative z-10 h-full overflow-y-auto pb-40">
        {/* Header */}
        <header className="border-b border-green-700 flex flex-row items-center p-5 pb-3 sticky top-0 bg-white/90 backdrop-blur-md z-20">
          <Link href="/" className="mr-3 z-50">
            <ArrowLeft className="text-green-800" size={26} />
          </Link>
          <h1 className="text-xl font-bold text-green-800 flex-1">Daily Commute</h1>
          <CommunityCorner />
        </header>

        <main className="flex flex-col gap-8 mt-6">
          {/* Next Scheduled Card */}
          <div className="bg-gray-200 rounded-[28px] p-5 w-[90%] max-w-md mx-auto shadow-[0_8px_25px_rgba(0,0,0,0.15)] relative overflow-hidden backdrop-blur-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Next scheduled</p>
                <h2 className="text-lg font-bold text-gray-900">College → Railway Station</h2>
              </div>
              <div className="bg-green-200/70 text-green-800 text-[13px] font-bold px-3 py-1 rounded-full">
                3:30 PM
              </div>
            </div>
            <button
              onClick={() => setIsRideActive(true)}
              className="w-full bg-green-700 text-white rounded-full py-3.5 font-bold flex justify-center items-center gap-2 hover:bg-green-800 hover:shadow-lg transition-all active:scale-95"
            >
              <Play fill="currentColor" size={18} /> Start Now
            </button>
          </div>

          {/* Saved Routes Section */}
          <div className="w-full max-w-md mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-center mb-1 w-[90%] mx-auto">
              <h3 className="text-[17px] font-bold text-gray-800">Saved Routes</h3>
              <button className="p-1 border-[1.5px] border-black rounded-full text-black hover:bg-gray-100 transition-colors">
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <ActionCard
                title="Home → Office"
                subtitle="12 km • 35 min • 4 stops"
                icon={<Bus size={22} />}
              />
              <ActionCard
                title="Home → Gym"
                subtitle="3 km • 10 min • Direct"
                icon={<PersonStanding size={22} />}
              />
              <ActionCard
                title="Office → Mall"
                subtitle="8 km • 25 min • 3 stops"
                icon={<Bus size={22} />}
              />
            </div>
          </div>
        </main>

        <SOSButton />
      </div>

      {/* Live Ride Tracker Overlay */}
      <AnimatePresence>
        {isRideActive && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-gray-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white flex justify-between items-center z-10 shadow-sm">
              <h2 className="text-xl font-bold text-green-800">Livetrack</h2>
              <button
                onClick={() => setIsRideActive(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-32">
              {/* Video Map Container */}
              <div className="w-full aspect-[4/3] bg-black relative shrink-0 shadow-inner pointer-events-none">
                {/* Embedded YouTube video */}
                <video
                src="/v2.mp4"
                className="w-full h-full object-cover opacity-90"
                autoPlay
                muted
                playsInline
              />

                {/* Live Indicator */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
                  <div className="w-2 h-2 rounded-full bg-white animate-ping" /> LIVE
                </div>
              </div>

              {/* Journey Details */}
              <div className="p-6 flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className="p-3.5 bg-green-100 text-green-700 rounded-full shrink-0">
                    <MapPin size={26} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Current Location</p>
                    <p className="text-lg font-bold text-gray-800 leading-tight">Pimpri Chinchwad College of Engineering and Research</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className="p-3.5 bg-blue-100 text-blue-700 rounded-full shrink-0">
                    <Clock size={26} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Estimated Arrival</p>
                    <p className="text-lg font-bold text-gray-800 leading-tight">1 hour 15 Mins <span className="font-normal text-gray-500 text-[15px]">(8:45 AM)</span></p>
                  </div>
                </motion.div>

                {/* Animated Route Progress line */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-2"
                >
                  <div className="flex justify-between text-sm font-bold text-gray-500 mb-3 px-1">
                    <span>College</span>
                    <span>Railway Station</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden relative">
                    {/* Animated Fill */}
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "2%" }}
                      transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
                      className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
                    />
                  </div>
                </motion.div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
