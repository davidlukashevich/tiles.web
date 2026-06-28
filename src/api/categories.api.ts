import { supabase } from "../lib/supabase"
import type { Category } from "../types/response/Category.type"

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const { data, error } = await supabase
            .from("public_categories_view")
            .select("*")
            .is("parent_id", null)
            .order("name")

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        throw error
    }
} 