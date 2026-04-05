import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { forwardRef, memo, useId, type ComponentProps } from "react"

export type SharedInputType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "date"
  | "time"

export interface IInputProps
  extends Omit<ComponentProps<typeof Input>, "type"> {
  label?: string
  error?: string
  hint?: string
  type?: SharedInputType
  wrapperClassName?: string
  labelClassName?: string
  hintClassName?: string
}

const InputBase = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      error,
      hint,
      id,
      label,
      labelClassName,
      type = "text",
      wrapperClassName,
      hintClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label className={cn("grid gap-1.5 text-sm", wrapperClassName)} htmlFor={inputId}>
        {label ? (
          <span className={cn("text-[--color-text-sub]", labelClassName)}>{label}</span>
        ) : null}
        <Input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={Boolean(error)}
          className={className}
          {...props}
        />
        {error ? (
          <p className="text-xs text-[--color-error]">{error}</p>
        ) : hint ? (
          <p className={cn("text-xs text-[--color-text-muted]", hintClassName)}>{hint}</p>
        ) : null}
      </label>
    )
  }
)

InputBase.displayName = "SharedInput"

export const SharedInput = memo(InputBase)
