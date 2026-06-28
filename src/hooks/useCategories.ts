import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/categories.api";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories
    })
}