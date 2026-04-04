"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

export default function CommunityCorner() {
  const [open, setOpen] = useState(false)

  // 🔒 lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [open])

  return (
    <div className="w-[45px] h-[45px] relative shrink-0">
      {/* Floating Community Button */}
      <motion.div
        layout
        onClick={() => setOpen(true)}
        className={`
          flex items-center justify-center
          cursor-pointer
          shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          border-8 overflow-hidden
          ${open 
            ? "fixed inset-0 m-auto z-[60] bg-white border-green-700" 
            : "absolute inset-0 z-20 bg-green-700 border-green-700"}
        `}
        animate={{
          width: open ? "85vw" : "100%",
          height: open ? "75vh" : "100%",
          borderRadius: open ? 20 : 16,
          rotate: open ? 0 : -45, // tilt when closed
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Icon (closed state) */}
        {!open && (
          <motion.div animate={{ rotate: 45 }}>
            <Users size={22} className="text-white" />
          </motion.div>
        )}

        {/* Expanded Menu Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-5 text-black"
            >
              <h2 className="text-lg font-semibold mb-4">Community</h2>

              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-gray-100">
                  Local Alerts
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-100">
                  Safe Routes
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-100">
                  Discussions
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
                className="mt-6 bg-green-700 text-white px-4 py-2 rounded-full text-sm"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
