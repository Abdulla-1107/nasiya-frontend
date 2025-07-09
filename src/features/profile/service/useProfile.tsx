import { product } from "@/shared/keys";
import { api } from "@/shared/lib/axios";
import { useQuery,  } from "@tanstack/react-query";

export const useProfile = () => {
  // const queryClient = useQueryClient();

  const getBuy = (params: any) =>
    useQuery({
      queryKey: [product, params],
      queryFn: () => api.get("buy", { params }).then((res) => res.data),
    });

  return { getBuy };
};
