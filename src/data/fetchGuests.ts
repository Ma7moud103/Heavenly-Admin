import type { IGuest } from "@/interfaces/IGuest";
import { supabase } from "@/services/supabase";
import type { PostgrestError } from "@supabase/supabase-js";


async function fetchGuests(): Promise<{Guests: IGuest[], error: PostgrestError | null}> {


let { data: guests, error } = await supabase.from("guests").select("*");

    if (error) throw new Error(error.message);
    return {
        Guests: guests as IGuest[],
        error
    }
        
}
 

export default fetchGuests;