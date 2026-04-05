"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Phone, BatteryCharging, ShieldAlert } from "lucide-react"
import Link from "next/link"
import SOSButton from "@/components/ui/sos"
import CommunityCorner from "@/components/communityDiv"

export default function SharingPage() {
  return (
    <div className="relative overflow-hidden h-screen flex flex-col bg-gray-100">


      <header className="absolute top-0 left-0 w-full z-20 flex flex-row items-center p-5 pb-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <Link href="/" className="mr-3 p-2 shrink-0 bg-white/20 backdrop-blur-md rounded-full shadow-sm hover:bg-white/30 transition-colors">
          <ArrowLeft className="text-white" size={24} />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 drop-shadow-md tracking-wide">Live Tracking</h1>

      </header>


      <div className="flex-1 bg-black relative shadow-inner pointer-events-none">
        <video
                src="/v3.mp4"
                className="w-full h-full object-cover opacity-90"
                autoPlay
                muted
                playsInline
                loop
              />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-100 to-transparent" />
      </div>

      {/* Bottom Information Data Sheet */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white rounded-t-[36px] -mt-10 relative z-10 shadow-[0_-15px_50px_rgba(0,0,0,0.15)] flex flex-col pt-4 pb-28 px-6 text-black border-t border-white/50"
      >

        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />


        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] rounded-full bg-pink-100 border-2 border-pink-400 p-[2px] shadow-sm shrink-0">
              {/* <img src="https://i.pravatar.cc/150?img=47" alt="User Profile" className="w-full h-full object-cover rounded-full" /> */}
              <div className="w-full h-full  rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-yellow-100 text-yellow-700 font-black shrink-0 text-sm">
                                    H
                                </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 leading-tight">Harshita's Journey</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </div>
                <p className="text-[13px] font-bold text-green-600 uppercase tracking-wider">Location Live</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end pl-2 border-l border-gray-100">
            <span className="text-2xl font-black text-gray-900">41</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Mins ETA</span>
          </div>
        </div>

        {/* Route Context Logic */}
        <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 mb-6 shadow-sm">
          <div className="relative flex flex-col gap-5">
            {/* Connecting Route Line */}
            <div className="absolute left-[11px] top-5 bottom-5 w-[2px] bg-gray-300" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-6 h-6 rounded-full bg-gray-200 border-[3px] border-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Current Phase</p>
                <p className="font-bold text-gray-800 text-[15px]">Moving • Aundh-Ravet Highway, Aundh</p>
              </div>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-6 h-6 rounded-full bg-green-200 border-[3px] border-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Destination</p>
                <p className="font-bold text-gray-800 text-[15px]">Pune Railway Station</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & Biometrics */}
        <div className="flex gap-4">
          <div className="bg-blue-50/50 rounded-2xl p-3 px-4 flex flex-col justify-center items-center gap-1.5 border border-blue-100 min-w-[90px]">
            <BatteryCharging size={22} className="text-blue-600" />
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">79%</span>
          </div>

          <button className="flex-1 bg-green-100/50 rounded-2xl p-3 flex flex-col justify-center items-center gap-1.5 border border-green-200 hover:bg-green-100 active:scale-95 transition-all shadow-sm">
            <Phone size={22} className="text-green-700" />
            <span className="text-[11px] font-bold text-green-800 uppercase tracking-wide">Call Harshita</span>
          </button>

          <button className="bg-red-100/50 rounded-2xl p-3 px-5 flex flex-col justify-center items-center gap-1.5 border border-red-200 hover:bg-red-100 active:scale-95 transition-all shadow-sm">
            <ShieldAlert size={22} className="text-red-600" />
            <span className="text-[11px] font-bold text-red-800 uppercase tracking-wide">Alert</span>
          </button>
        </div>

      </motion.div>

    </div>
  )
}
