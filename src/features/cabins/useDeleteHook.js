import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteHook() {
  const queryClient = useQueryClient(); //queryclient to invalidate the queries so that once the data is deleted it will refresh the data by invalidating the query

  //useMutation to delete the row
  const { mutate: deleteCabinMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabinMutate };
}
