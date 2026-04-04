import { cn } from "@/lib/utils"

export interface Column<T> {
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
    <div className={cn("table-wrapper min-h-[22rem]", className)}>
      <div className="hidden min-h-[22rem] overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[--color-border]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[--color-text-sub]",
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
                  className="border-b border-[--color-border-subtle] transition-colors hover:bg-[--color-bg-subtle]"
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

      <div className="min-h-[22rem] space-y-3 p-3 md:hidden">
        {data.length === 0 ? (
          <div className="rounded-xl border border-[--color-border] bg-[--color-bg-subtle] px-4 py-8 text-center text-sm text-[--color-text-muted]">
            {emptyMessage}
          </div>
        ) : (
          data.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-4 shadow-sm"
            >
              <div className="space-y-3">
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={cn(
                      "flex items-start justify-between gap-4 border-b border-[--color-border-subtle] pb-3 last:border-b-0 last:pb-0",
                      column.className
                    )}
                  >
                    {column.header ? (
                      <span className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[--color-text-sub]">
                        {column.header}
                      </span>
                    ) : (
                      <span />
                    )}
                    <div className="min-w-0 flex-1 text-right text-sm text-[--color-text]">
                      {column.cell
                        ? column.cell(row)
                        : (row as Record<string, unknown>)[column.key] as React.ReactNode}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
