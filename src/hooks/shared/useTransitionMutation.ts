import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useTransitionMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    onSuccess: (...args) =>
      startTransition(() => {
        options?.onSuccess?.(...args);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}
