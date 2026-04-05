"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Camera, FileEdit, CheckCircle, Info, ScanLine, AlertCircle } from "lucide-react"
import Link from "next/link"
import SOSButton from "@/components/ui/sos"
import { ActionCard } from "@/components/booking"
import CommunityCorner from "@/components/communityDiv"

type ViewState = "menu" | "camera" | "manual"

export default function TravelPage() {
  const [view, setView] = useState<ViewState>("menu")
  
  // Camera APIs & Stream logic
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState(false)

  // Tracking details
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  
  // Manual entry states
  const [plate, setPlate] = useState("")
  const [notes, setNotes] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  // Cleanup camera streams globally to prevent hardware locks
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  // Initialize/De-initialize camera smoothly based on view
  useEffect(() => {
    if (view === "camera" && !scanResult) {
      setCameraError(false)
      // Request rear camera with fallback to front
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
        .then((s) => {
          setStream(s)
          if (videoRef.current) {
            videoRef.current.srcObject = s
          }
        })
        .catch(err => {
          console.error("Camera access denied or unavailable", err)
          setCameraError(true)
        })
    } else {
      stopCamera()
    }

    return stopCamera // Clean up strictly on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, scanResult])


  const handleScan = () => {
    setIsScanning(true)
    
    // Simulate processing via AI API
    setTimeout(() => {
      setIsScanning(false)
      stopCamera() // Shut off camera stream aggressively when done
      setScanResult({
        plateNumber: "MH 41 BS 9269",
        status: "Data Saved to Log"
      })
    }, 2500)
  }

  const handleManualSave = () => {
    setIsSaved(true)
    setTimeout(() => {
      setView("menu")
      setIsSaved(false)
      setPlate("")
      setNotes("")
    }, 2000)
  }

  return (
    <div className="relative overflow-hidden h-screen bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/background-doodle.png'),url('/background-doodle.png')] bg-no-repeat bg-size-[100%_50%,100%_50%] bg-position-[top,bottom] opacity-20 pointer-events-none md:bg-[url('/background-doodle.png')] md:bg-repeat md:bg-size-[150px]" />

      {/* Main Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Dynamic via State */}
        <header className="border-b border-green-700 flex flex-row items-center p-5 pb-3 sticky top-0 bg-white/90 backdrop-blur-md z-20">
          {view === "menu" ? (
            <Link href="/" className="mr-3 z-50">
              <ArrowLeft className="text-green-800" size={26} />
            </Link>
          ) : (
            <button onClick={() => { setView("menu"); setScanResult(null) }} className="mr-3 z-50">
              <ArrowLeft className="text-green-800" size={26} />
            </button>
          )}
          <h1 className="text-xl font-bold text-green-800 flex-1">Free Travel</h1>
          <CommunityCorner />
        </header>

        <main className="flex-1 overflow-y-auto pb-32">
          <AnimatePresence mode="wait">
            
            {/* ====== MENU VIEW ====== */}
            {view === "menu" && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6 p-5 py-8 items-center justify-center min-h-[60vh] text-black"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Verify Your Ride</h2>
                  <p className="text-gray-500 mt-2 max-w-[280px]">Secure your journey by logging vehicle details before getting in.</p>
                </div>

                <div className="w-full max-w-md" onClick={() => setView("camera")}>
                  <ActionCard
                    title="Camera Scan"
                    subtitle="Auto-detect number plate"
                    icon={<Camera size={22} />}
                  />
                </div>

                <div className="w-full max-w-md mt-2" onClick={() => setView("manual")}>
                  <ActionCard
                    title="Enter Manually"
                    subtitle="Type plate number & details"
                    icon={<FileEdit size={22} />}
                  />
                </div>
              </motion.div>
            )}

            {/* ====== NATIVE CAMERA VIEW ====== */}
            {view === "camera" && (
              <motion.div
                key="camera"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full p-5 text-black"
              >
                {!scanResult ? (
                  <div className="flex flex-col items-center flex-1">
                    <p className="text-center text-gray-600 mb-4 font-medium bg-white/80 py-2 px-4 rounded-full shadow-sm">Position the number plate in the frame</p>
                    
                    {/* Live Viewfinder */}
                    <div className="w-full max-w-md aspect-[4/5] bg-gray-900 rounded-[32px] relative overflow-hidden flex items-center justify-center shadow-2xl border-4 border-gray-100">
                      
                      {cameraError ? (
                        <div className="flex flex-col items-center text-center p-6 text-gray-400 z-10">
                          <AlertCircle size={40} className="mb-3 opacity-50 text-red-400" />
                          <p className="font-semibold text-white">Camera Access Denied</p>
                          <p className="text-sm mt-2">Please enable permissions or use manual entry.</p>
                        </div>
                      ) : (
                        <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          muted 
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isScanning ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}
                        />
                      )}

                      {/* Targeting Reticle Overlay */}
                      <div className="w-64 h-24 border-2 border-white/40 rounded-lg relative z-10 pointer-events-none">
                        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-green-500 rounded-tl" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-green-500 rounded-tr" />
                        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-green-500 rounded-bl" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-green-500 rounded-br" />
                        
                        {/* Scanning Laser Drop Animation */}
                        {isScanning && (
                          <motion.div 
                            initial={{ top: 0 }}
                            animate={{ top: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-green-500 shadow-[0_0_15px_3px_rgba(34,197,94,0.6)]" 
                          />
                        )}
                      </div>

                      {/* Scan Action Button */}
                      <div className="absolute inset-x-0 bottom-8 flex justify-center z-10">
                        <button 
                          onClick={handleScan}
                          disabled={isScanning || cameraError}
                          className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 active:scale-95 transition-all text-lg font-bold flex items-center gap-3 disabled:opacity-50 disabled:active:scale-100"
                        >
                          <ScanLine size={24} /> {isScanning ? "Processing..." : "Detect Plate"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-md mx-auto bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
                  >
                    {/* Header Splash */}
                    <div className="bg-green-600 p-8 pb-10 text-center text-white relative">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <CheckCircle size={44} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight">Number Plate Saved</h3>
                      <p className="text-sm opacity-90 font-medium mt-1">Free to travel</p>
                      <div className="absolute -bottom-1 left-0 right-0 h-6 bg-white rounded-t-[32px]" />
                    </div>

                    <div className="px-6 pb-6 pt-2 flex flex-col gap-5">

                      {/* Visual License Plate */}
                      <div className="bg-yellow-100 rounded-xl p-4 text-center border-4 border-yellow-400 shadow-sm relative z-10">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Detected Label</span>
                        <span className="text-3xl font-black text-gray-900 tracking-[0.15em] font-mono">{scanResult.plateNumber}</span>
                      </div>

                      <div className="flex flex-col gap-4 px-2 mt-2">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-100 rounded-full text-green-600">
                            <Info size={22} />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Data Context</p>
                            <p className="font-bold text-green-700 text-lg">{scanResult.status}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => { setView("menu"); setScanResult(null); }}
                        className="w-full mt-4 bg-gray-900 text-white rounded-2xl py-4 font-bold text-lg hover:bg-gray-800 shadow-lg active:scale-[0.98] transition-all"
                      >
                        Done
                      </button>

                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ====== MANUAL VIEW ====== */}
            {view === "manual" && (
              <motion.div
                key="manual"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full p-5 items-center text-black"
              >
                <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 relative">
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Vehicle</h2>

                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="text-sm font-bold text-gray-600 ml-1">Number Plate</label>
                      <input
                        type="text"
                        placeholder="e.g. MH 01 AB 1234"
                        value={plate}
                        onChange={e => setPlate(e.target.value)}
                        className="w-full mt-1 bg-gray-100 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-800 font-bold placeholder:font-normal placeholder:text-gray-400 uppercase"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-600 ml-1">Context / Details (Optional)</label>
                      <textarea
                        placeholder="Color, model, or driver description..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        rows={3}
                        className="w-full mt-1 bg-gray-100 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-800 font-medium placeholder:text-gray-400 resize-none"
                      />
                    </div>

                    <button
                      onClick={handleManualSave}
                      disabled={!plate || isSaved}
                      className="w-full mt-4 bg-green-700 text-white rounded-xl py-4 font-bold text-lg flex justify-center items-center gap-2 hover:bg-green-800 shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                    >
                      {isSaved ? <CheckCircle size={22} /> : <FileEdit size={22} />}
                      {isSaved ? "Saved Securely!" : "Save Details"}
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      </div>

      <SOSButton />
    </div>
  )
}
