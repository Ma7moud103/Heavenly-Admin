import { supabase } from "@/services/supabase"
import type { PostgrestError } from "@supabase/supabase-js"
import type { IAuditLog } from "@/interfaces/IAuditLog"

const fetchAudits = async (): Promise<{
  audit_logs: IAuditLog[] | null
  error: PostgrestError | null
}> => {
  const { data: audit_logs, error } = await supabase
    .from("audit_logs")
    .select(`*,user:performed_by(*)`)

  return {
    audit_logs: audit_logs as IAuditLog[] | null,
    error,
  }
}

export default fetchAudits
