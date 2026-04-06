import { fetchBookingsStatus } from "@/data/fetchBookingsStatus";
import type { IBookingStatus } from "@/interfaces/IBooking";
import { useQuery } from "@tanstack/react-query"


 const UseBookingStatus = () => {
    
    return useQuery<IBookingStatus[]>({
        queryKey: ["bookingStatus"],
        queryFn: async () => {
            const {booking_status , error } = await fetchBookingsStatus()
                if (error) throw new Error(error.message || "Failed to fetch booking statuses") 
            return booking_status ?? []
            
         }

    })

}

export default UseBookingStatus