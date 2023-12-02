import { useQuery, useMutation, useQueryClient } from "react-query";

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function useCustomQuery(key, queryFunction, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function useCustomMutate(key, mutationFunction, invalidateKeys, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => invalidateKeys.forEach(key => queryClient.invalidateQueries(key)),
      ...options,
    });
  }

  return { useCustomQuery, useCustomMutate };
}
