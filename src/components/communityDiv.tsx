"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, X, AlertTriangle, Route, ShieldCheck, Map, Star, MessageSquare } from "lucide-react"

export default function CommunityCorner() {
  const [open, setOpen] = useState(false)

  // 🔒 lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [open])

  return (
    <div className="w-[45px] h-[45px] relative shrink-0">
      
      {/* Invisible anchor maintaining Header flex geometry flawlessly */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.15)] rounded-[16px] bg-green-700 hover:bg-green-800 transition-colors border-2 border-white/20 select-none"
      >
         <Users size={22} className="text-white" />
      </button>

      {/* Floating Scalable Modal Container decoupled from flex-bounds logic */}
      <AnimatePresence>
        {open && (
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 15 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 15 }}
             transition={{ type: "spring", stiffness: 250, damping: 25 }}
             className="fixed inset-x-4 top-[10vh] max-h-[85vh] bg-white rounded-[32px] shadow-2xl z-[60] flex flex-col overflow-hidden m-auto xl:max-w-md xl:inset-x-auto"
           >
              {/* Header */}
              <div className="flex justify-between items-center shrink-0 z-10 sticky top-0 bg-white px-6 py-5 border-b border-gray-100">
                <h2 className="text-2xl font-black tracking-wide text-gray-800 flex items-center gap-2">
                  <Users size={24} className="text-green-600" />
                  Community
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

              {/* Scrollable Data Container */}
              <div className="flex-1 overflow-y-auto px-6 py-4 pb-8 space-y-7 scrollbar-hide">
                 
                 {/* Local Alerts */}
                 <section>
                    <h3 className="font-bold uppercase tracking-widest text-[11px] mb-3 text-gray-400">Security Warnings</h3>
                    <div className="relative overflow-hidden bg-red-50 border border-red-100 rounded-[22px] p-5 shadow-sm">
                       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                          <AlertTriangle size={60} />
                       </div>
                       <div className="flex items-start gap-4 relative z-10">
                           <div className="p-3 bg-red-100 text-red-600 rounded-full shadow-inner inline-flex">
                              <AlertTriangle size={20} />
                           </div>
                           <div className="flex flex-col">
                             <h4 className="font-bold text-red-900 text-[15px]">2 Active Local Alerts</h4>
                             <p className="text-xs text-red-700/80 font-bold mt-1 leading-snug">
                                Incident mapping reported high congestion near Aundh-Ravet curve. Caution advised mapping night-routes.
                             </p>
                           </div>
                       </div>
                    </div>
                 </section>

                 {/* Safe Routes Hub (Priority Focus) */}
                 <section>
                    <div className="flex items-center justify-between mb-3 text-green-700">
                        <h3 className="font-bold uppercase tracking-widest text-[11px] flex items-center gap-1.5">
                           <ShieldCheck size={14} /> Verified Safe Routes
                        </h3>
                    </div>
                    
                    <div className="bg-gray-50 rounded-[24px] p-5 border border-gray-100 shadow-sm flex flex-col gap-5">
                        
                        {/* Status Output */}
                        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                               <Route size={20} />
                            </div>
                            <div className="flex-1">
                               <h4 className="font-bold text-gray-900 text-[15px]">College → Railway Station</h4>
                               <span className="text-[10px] font-black tracking-widest text-green-600 uppercase">System Checked • 4.8/5</span>
                            </div>
                            <ShieldCheck size={24} className="text-green-500 justify-self-center shrink-0" />
                        </div>

                        {/* Interactive Analytics Tools */}
                        <div className="grid grid-cols-2 gap-3">
                           <button className="bg-white border text-center border-gray-200 p-4 rounded-[16px] flex flex-col items-center gap-2 font-bold text-xs text-gray-700 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all active:scale-95 shadow-sm group">
                              <Map size={22} className="text-gray-400 group-hover:text-green-600" />
                              Audit Route
                           </button>
                           <button className="bg-white border text-center border-gray-200 p-4 rounded-[16px] flex flex-col items-center gap-2 font-bold text-xs text-gray-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all active:scale-95 shadow-sm group">
                              <Star size={22} className="text-gray-400 group-hover:text-blue-600" />
                              Rate Safety
                           </button>
                        </div>
                    </div>
                 </section>

                 {/* Social / Discussions block */}
                 <section>
                    <h3 className="font-bold uppercase tracking-widest text-[11px] mb-3 text-gray-400">Live Forums</h3>
                    <button className="w-full bg-blue-50/50 border border-blue-100 p-5 rounded-[22px] flex items-center justify-between shadow-sm hover:bg-blue-50 transition-colors active:scale-[0.98]">
                       <div className="flex items-center gap-4">
                           <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                              <MessageSquare size={20} />
                           </div>
                           <span className="font-bold text-blue-900">Area Discussions</span>
                       </div>
                       <div className="text-[10px] font-black tracking-widest uppercase bg-blue-200 text-blue-800 rounded-full px-3 py-1.5 shadow-inner">
                         7 Live
                       </div>
                    </button>
                 </section>

              </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Dimmer backdrop decoupled to strictly root level overlay protecting header boundaries safely */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
