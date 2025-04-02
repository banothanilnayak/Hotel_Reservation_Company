import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: settingsUpdateMutation, isLoading: isUpdating } = useMutation(
    {
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Settings Updated Successfully.");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  return { settingsUpdateMutation, isUpdating };
}
