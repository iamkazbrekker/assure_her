"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Users, MapPin, Navigation, ShieldAlert, PhoneCall, PlusCircle, AlertCircle } from "lucide-react"

export default function MenuCorner() {
  const [open, setOpen] = useState(false)

  // 🔒 lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [open])

  return (
    <>
      {/* Floating Menu Button */}
      <motion.div
        onClick={() => {
            if (!open) setOpen(true)
        }}
        className={`
          fixed top-4 right-5 z-50
          flex items-center justify-center
          cursor-pointer overflow-hidden overflow-y-auto
          scrollbar-hide
          shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          border-8
          ${open ? "bg-white border-green-700 shadow-2xl" : "bg-green-700 border-green-700"}
        `}
        animate={{
          width: open ? "85vw" : 45,
          height: open ? "80vh" : 45,
          borderRadius: open ? 24 : 16,
          rotate: open ? 0 : -45, // opposite tilt of left button
          backgroundColor: open ? "#ffffff" : "#15803d",
          x: open ? "-3vw" : 0,   // shift left slightly
          y: open ? "10vh" : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Icon (closed state) */}
        {!open && (
          <motion.div animate={{ rotate: 45 }}>
            <Menu size={22} className="text-white" />
          </motion.div>
        )}

        {/* Expanded Menu Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-0 bottom-0 p-5 flex flex-col text-gray-900 scrollbar-hide"
            >
              
              {/* Header */}
              <div className="flex justify-between items-center mb-5 shrink-0 z-10 sticky top-0 bg-white pb-2">
                <h2 className="text-2xl font-black tracking-wide text-gray-800 flex items-center gap-2">
                  <Users size={24} className="text-green-600" />
                  Safety
                </h2>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(false)
                    }}
                    className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors shadow-inner"
                >
                    <X size={20} />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto space-y-6 pb-6 pr-1 shrink-0 scrollbar-hide">
                
                {/* Location Sharing Section */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-widest pl-1">Location Sharing</h3>
                    </div>
                    
                    <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 flex flex-col gap-3 shadow-sm">
                        
                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-yellow-100 text-yellow-700 font-black shrink-0 text-sm">
                                    M
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900">Mom</span>
                                    <span className="text-[10px] font-bold text-green-600 uppercase flex items-center gap-1">
                                        <MapPin size={10} /> Always
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-200/60" />

                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-yellow-100 text-yellow-700 font-black shrink-0 text-sm">
                                    G
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900">Gauri</span>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1">
                                        <Navigation size={10} /> While Travelling
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-200/60" />

                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-yellow-100 text-yellow-700 font-black shrink-0 text-sm">
                                    G
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900">Gauravi</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <AlertCircle size={10} /> When Specified
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-3 flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white border-2 border-dashed border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-colors active:scale-95 text-sm">
                        <PlusCircle size={18} /> Edit Sharing Preferences
                    </button>
                </section>


                {/* Emergency SOS Contacts */}
                <section>
                    <div className="flex items-center justify-between mb-3 mt-2 text-red-600">
                        <h3 className="text-[13px] font-bold uppercase tracking-widest pl-1 flex items-center gap-2">
                            <ShieldAlert size={16} /> SOS Contacts
                        </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        
                        {/* Custom Emergency Contact */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-red-100 shadow-sm flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-red-900">Dad</span>
                                <span className="text-xs text-gray-500 font-bold">+91 98765 43210</span>
                            </div>
                            <button className="h-10 w-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors shrink-0">
                                <PhoneCall size={18} />
                            </button>
                        </div>

                        {/* Custom Emergency Contact */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900">Brother</span>
                                <span className="text-xs text-gray-500 font-bold">+91 91234 56789</span>
                            </div>
                            <button className="h-10 w-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0">
                                <PhoneCall size={18} />
                            </button>
                        </div>

                        {/* Official Authorities */}
                        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm flex items-center justify-between mt-2">
                            <div className="flex flex-col">
                                <span className="font-bold text-blue-900">Women's Helpline</span>
                                <span className="text-xs text-blue-600 font-black tracking-widest">1091</span>
                            </div>
                            <button className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors shrink-0">
                                <PhoneCall size={18} />
                            </button>
                        </div>

                         <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-blue-900">Police Support</span>
                                <span className="text-xs text-blue-600 font-black tracking-widest">100 • 112</span>
                            </div>
                            <button className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors shrink-0">
                                <PhoneCall size={18} />
                            </button>
                        </div>

                    </div>
                </section>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Invisible Catch-All Background Overlay to close on outside-click without dimming website */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-transparent z-40"
          />
        )}
      </AnimatePresence>
    </>
  )
}