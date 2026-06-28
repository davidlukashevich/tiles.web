export type Category = {
    id: string
    name: string
    slug: string
    parent_id: string | null
    image_url: string | null
    parent_slug: string | null
    parent_name: string | null
    created_at: string
    updated_at: string
}