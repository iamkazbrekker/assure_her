"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User } from "lucide-react"

export default function ProfileCorner() {
    const [open, setOpen] = useState(false)

      useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto"
        return () => (document.body.style.overflow = "auto")
      }, [open])

    return (
        <>
            {/* Floating Profile Button */}
            <motion.div
                onClick={() => setOpen(true)}
                className={`
    fixed top-4 left-5 z-50
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
                    rotate: open ? 0 : 45,
                    backgroundColor: open ? "#ffffff" : "#15803d",
                    x: open ? "3vw" : 0,   // shift left to center
          y: open ? "10vh" : 0, // smooth transition
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
                            className="absolute inset-0 p-5 text-white"
                        >
                            <h2 className="text-lg font-semibold mb-2">Profile</h2>
                            <p className="text-sm opacity-90">
                                User info goes here
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpen(false)
                                }}
                                className="mt-4 bg-white text-green-700 px-4 py-2 rounded-full text-sm"
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