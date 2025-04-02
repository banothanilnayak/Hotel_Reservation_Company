import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: edit, isEditing } = useMutation({
    mutationFn: ({ newData, editID }) => createEditCabin(newData, editID),
    onSuccess: () => {
      toast.success("successfully Edited a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { edit, isEditing };
}
