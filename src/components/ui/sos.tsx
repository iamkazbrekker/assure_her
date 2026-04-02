"use client"

export default function SOSButton() {
  return (
    <button
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        bg-red-600 text-white
        px-10 py-3
        rounded-full
        text-xl font-bold tracking-wider
        shadow-[0_10px_25px_rgba(0,0,0,0.3)]
        active:scale-95
        transition-all duration-150
        z-50
      "
    >
      SOS
    </button>
  )
}