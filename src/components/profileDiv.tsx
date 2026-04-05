"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, X, Settings, ChevronRight, Shield, Heart, LogOut, Phone } from "lucide-react"

export default function ProfileCorner() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto"
        return () => { document.body.style.overflow = "auto" }
    }, [open])

    return (
        <>
            {/* Floating Profile Button / Modal */}
            <motion.div
                onClick={() => {
                    if (!open) setOpen(true)
                }}
                className={`
                    fixed top-4 left-5 z-50
                    flex items-center justify-center
                    cursor-pointer overflow-hidden overflow-y-auto
                    shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                    border-8
                    scrollbar-hide
                    ${open 
                        ? "bg-white border-green-700 shadow-2xl" 
                        : "bg-green-700 border-green-700"}
                `}
                animate={{
                    width: open ? "85vw" : 45,
                    height: open ? "75vh" : 45,
                    borderRadius: open ? 24 : 16,
                    rotate: open ? 0 : 45,
                    backgroundColor: open ? "#ffffff" : "#15803d",
                    x: open ? "3vw" : 0,
                    y: open ? "10vh" : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Icon (only when closed) */}
                {!open && (
                    <motion.div animate={{ rotate: -45 }}>
                        <User size={22} className="text-white"/>
                    </motion.div>
                )}

                {/* Expanded Profile Content */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute xl:inset-0 inset-1 p-5 flex flex-col text-gray-900 overflow-y-auto scrollbar-hide"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 shrink-0 z-10 sticky top-0 bg-white pb-2">
                                <h2 className="text-2xl font-black tracking-wide text-gray-800">Profile</h2>
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

                            {/* Profile Info Banner */}
                            <div className="flex flex-col items-center mb-8 relative shrink-0">
                                <div className="w-28 h-28 rounded-full p-1.5 border-4 border-green-500 mb-4 shadow-lg bg-white relative">
                                   {/* <img src="https://i.pravatar.cc/150?img=47" alt="Profile avatar" className="w-full h-full object-cover rounded-full" /> */}
                                   <div className="w-full object-cover h-full rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-yellow-100 text-yellow-700 font-black shrink-0 text-3xl">
                                    H
                                </div>
                                   <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                      <Shield size={12} className="text-white fill-current" />
                                   </div>
                                </div>
                                <h3 className="text-[28px] font-black text-gray-900 tracking-tight">Harshita Pandey</h3>
                                <div className="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mt-2">
                                    24 Years Old 
                                </div>
                            </div>

                            {/* Options Scroll Window */}
                            <div className="flex-1 space-y-3 pb-8 shrink-0">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98]">
                                   <div className="flex items-center gap-4">
                                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                                          <Settings size={22} className="text-gray-700" />
                                      </div>
                                      <div className="flex flex-col text-left">
                                        <span className="font-bold text-gray-900">Account Settings</span>
                                        <span className="text-xs text-gray-400 font-bold">Personal info, security</span>
                                      </div>
                                   </div>
                                   <ChevronRight size={20} className="text-gray-400" />
                                </button>

                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98]">
                                   <div className="flex items-center gap-4">
                                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                                          <Shield size={22} className="text-gray-700" />
                                      </div>
                                      <div className="flex flex-col text-left">
                                          <span className="font-bold text-gray-900">Privacy & Safety</span>
                                          <span className="text-xs text-gray-400 font-bold">Preferences, permissions</span>
                                      </div>
                                   </div>
                                   <ChevronRight size={20} className="text-gray-400" />
                                </button>
                                
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98]">
                                   <div className="flex items-center gap-4">
                                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                                          <Heart size={22} className="text-gray-700" />
                                      </div>
                                      <div className="flex flex-col text-left">
                                        <span className="font-bold text-gray-900">Emergency Contacts</span>
                                        <span className="text-xs text-gray-400 font-bold">Manage SOS alerts</span>
                                      </div>
                                   </div>
                                   <ChevronRight size={20} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Logout Base */}
                            <div className="mt-auto pt-2 border-t border-gray-100 bg-white shrink-0">
                                <button className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors shadow-sm active:scale-[0.98]">
                                   <LogOut size={20} strokeWidth={2.5} />
                                   Log Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Invisible Catch-All Background Overlay to allow outside-click closing without dimming website */}
            <AnimatePresence>
                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-40 bg-transparent"
                    />
                )}
            </AnimatePresence>
        </>
    )
}