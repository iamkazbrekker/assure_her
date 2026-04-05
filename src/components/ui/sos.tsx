"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SOSButton({ 
  onActiveChange, 
  shifted = false 
}: { 
  onActiveChange?: (v: boolean) => void, 
  shifted?: boolean 
}) {
    const [active, setActive] = useState(false)
    const [count, setCount] = useState(3)

    // 🔒 Lock scroll
    useEffect(() => {
        document.body.style.overflow = active ? "hidden" : "auto"
        onActiveChange?.(active)
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [active, onActiveChange])

    // ⏳ Countdown
    useEffect(() => {
        if (!active) return
        if (count === 0) return

        const t = setTimeout(() => setCount((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [active, count])

    return (
        <>
            {/* ================= BUTTON ================= */}
            <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none flex px-5">
              <AnimatePresence>
                  {!active && (
                      <motion.div
                          layout
                          key="button"
                          initial={{ scale: 1 }}
                          exit={{ scale: 30, opacity: 0 }}
                          transition={{ layout: { type: "spring", stiffness: 200, damping: 22 }, duration: 0.6, ease: "easeInOut" }}
                          onClick={() => {
                              setActive(true)
                              setCount(3)
                          }}
                          className={`
                            pointer-events-auto bg-red-600 text-white rounded-full font-bold cursor-pointer
                            shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                            ${shifted ? "ml-auto px-6 py-3 text-lg" : "mx-auto px-14 py-3 text-xl"}
                          `}
                      >
                          SOS
                      </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {/* ================= FULL SCREEN ================= */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        key="screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="
              fixed inset-0 z-60
              bg-red-500
              flex flex-col items-center justify-center
              text-white
            "
                    >
                        <div className="relative flex items-center justify-center z-10">

                            {/* 🔁 Ripple Rings */}
                            <motion.div
                                className="absolute w-40 h-40 border-2 border-white rounded-full"
                                animate={{ scale: [1, 2], opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            />

                            <motion.div
                                className="absolute w-40 h-40 border-2 border-white rounded-full"
                                animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />

                            {/* 🔴 Center Circle */}
                            <div className="w-28 h-28 bg-white text-black rounded-full flex items-center justify-center text-3xl font-bold">
                                {count > 0 ? count : "SOS"}
                            </div>

                        </div>

                        {/* 📞 Text */}
                        <div className="mt-6 text-center z-10 px-6">
                            <h2 className="text-lg font-semibold">
                                Emergency Calling...
                            </h2>
                            <p className="text-sm opacity-90 mt-2">
                                Your contacts, nearby users, and your organization will see your request for help
                            </p>
                        </div>

                        {/* 👥 Fake Contacts Row */}
                        <div className="flex gap-4 mt-6 z-10">
                            {['M', 'D', 'G', 'S'].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-yellow-100 text-yellow-700 font-black shrink-0 text-sm"
                                >
                                    {i}
                                </div>
                            ))}
                        </div>

                        {/* ✅ Exit Button */}
                        <button
                            onClick={() => setActive(false)}
                            className="
                absolute bottom-10
                bg-white text-red-500
                px-8 py-3 rounded-full
                font-semibold
                shadow-md
              "
                        >
                            I am safe
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}