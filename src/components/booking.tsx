import { ChevronRight } from "lucide-react"

type Props = {
    title: string
    subtitle: string
    icon: React.ReactNode
}

export function ActionCard({ title, subtitle, icon }: Props) {
    return (
        <div className="
  flex items-center justify-between
  w-[90%] max-w-md mx-auto
  bg-gray-200 rounded-full px-4 py-3
  shadow-[0_8px_25px_rgba(0,0,0,0.15)]
  hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
  transition-all duration-300
  cursor-pointer
">
            <div className="flex items-center gap-4">
                <div className="bg-green-700 text-white p-4 rounded-full">
                    {icon}
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
            </div>
            <ChevronRight size={28} />
        </div>
    )
}