import type { IBookingStatus } from "@/interfaces/IBooking";
import { supabase } from "@/services/supabase";
import { PostgrestError } from "@supabase/supabase-js";



export async function fetchBookingsStatus(): Promise<{
  booking_status: IBookingStatus[];

  error: PostgrestError | null;
}> {
  const { data, error } = await supabase.from("booking_status").select("*");

  if (error) {
    throw new Error(`Error fetching booking statuses: ${error.message}`);
  }

  return {
    booking_status: data as IBookingStatus[],
    error,
  };
}
