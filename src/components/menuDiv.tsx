"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"

export default function MenuCorner() {
  const [open, setOpen] = useState(false)

  // 🔒 lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [open])

  return (
    <>
      {/* Floating Menu Button */}
      <motion.div
        onClick={() => setOpen(true)}
        className={`
          fixed top-4 right-5 z-50
          flex items-center justify-center
          cursor-pointer
          shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          border-8
          ${open ? "bg-white border-green-700" : "bg-green-700 border-green-700"}
        `}
        animate={{
          width: open ? "85vw" : 45,
          height: open ? "75vh" : 45,
          borderRadius: open ? 20 : 16,
          rotate: open ? 0 : -45, // opposite tilt of left button
          x: open ? "-5vw" : 0,   // shift left to center
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
              className="absolute inset-0 p-5 text-black"
            >
              <h2 className="text-lg font-semibold mb-4">Menu</h2>

              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-gray-100">
                  Home
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-100">
                  Bookings
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-100">
                  Settings
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
    </>
  )
}