import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  cell?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  emptyMessage?: string
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  className,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className={cn("table-wrapper overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[--color-border]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold text-[--color-text-sub] uppercase tracking-wider",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[--color-text-muted]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[--color-border-subtle] hover:bg-[--color-bg-subtle] transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-sm text-[--color-text]",
                      column.className
                    )}
                  >
                    {column.cell
                      ? column.cell(row)
                      : (row as Record<string, unknown>)[column.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
