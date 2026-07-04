import fetchGuests from "@/data/rooms&bookings/fetchGuests"
import type { IGuest } from "@/interfaces/IGuest"
import { useQuery } from "@tanstack/react-query"



const UseGuests = () => {
    return useQuery<IGuest[]>({
        queryKey: ["guests"],
        queryFn: async () => {
            const { Guests, error } = await fetchGuests()
            if (error) throw new Error(error.message || "Failed to fetch guests")
            return Guests
        },
        initialData: [],
    })

    
}
 

export default UseGuests
