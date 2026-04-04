import fetchAudits from "@/data/fetchAudits"
import { useQuery } from "@tanstack/react-query"
import type { IAuditLog } from "@/interfaces/IAuditLog"


const UseAuditLogs = () => { 
    return useQuery<IAuditLog[]>({
        queryKey: ["audit_logs"],
        queryFn: async () => {
            const { audit_logs, error } = await fetchAudits()
            if (error) throw new Error(error.message)
            return audit_logs ??[]
        }

    })
}


export default UseAuditLogs