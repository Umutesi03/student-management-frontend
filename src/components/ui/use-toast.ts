import { toast as sonnerToast } from "sonner"

export function useToast() {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: (options: any) => sonnerToast(options),
    dismiss: sonnerToast.dismiss,
  }
}
