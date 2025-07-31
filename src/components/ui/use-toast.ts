import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: (options: Parameters<typeof sonnerToast>[0]) => sonnerToast(options),
    dismiss: sonnerToast.dismiss,
  };
}
