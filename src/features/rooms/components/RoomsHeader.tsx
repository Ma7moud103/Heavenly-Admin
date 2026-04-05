import { memo, type ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

function RoomsHeaderComponent({ children }: IProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rooms</h1>
        <p className="text-[--color-text-sub]">Manage hotel rooms and availability</p>
      </div>
      {children}
    </div>
  )
}

export const RoomsHeader = memo(RoomsHeaderComponent)
