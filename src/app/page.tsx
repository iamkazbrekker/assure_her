import { ActionCard } from "@/components/booking"
import MenuCorner from "@/components/menuDiv"
import ProfileCorner from "@/components/profileDiv"
import SOSButton from "@/components/ui/sos"
import { Bus, Car, ThumbsUp} from "lucide-react"
import Link from "next/link"

function Page() {
  return (
    <div className="relative overflow-hidden h-screen">
      
      <div
        className="
          absolute inset-0
          bg-[url('/background-doodle.png'),url('/background-doodle.png')]
          bg-no-repeat
          bg-size-[100%_50%,100%_50%]
          bg-position-[top,bottom]
          opacity-20

          md:bg-[url('/background-doodle.png')]
          md:bg-repeat
          md:bg-size-[150px]
        "
      />

      <div className="relative z-10">
        <header className="border-b border-green-700 flex flex-row justify-between p-5 pb-3">
          <ProfileCorner />
          <img src={"/name.png"} className="h-10 ml-10"/>
          <MenuCorner />
        </header>

        <main className="flex justify-center items-center min-h-screen flex-col gap-5">
          <Link href={"/cab"} className="w-full max-w-md">
            <ActionCard
            title="Cab Booking"
            subtitle="Book Secure Rides"
            icon={<Car />}
          />
          </Link>
          
          <Link href={"/bus"} className="w-full max-w-md">
          <ActionCard
            title="Bus / Metro"
            subtitle="Select Your Route"
            icon={<Bus />}
          />
          </Link>

          <Link href={"/travel"} className="w-full max-w-md">
          <ActionCard
            title="Free Travel"
            subtitle="Hitchhiking alone?"
            icon={<ThumbsUp />}
          />
          </Link>
        </main>

        <SOSButton />
      </div>

    </div>
  )
}

export default Page