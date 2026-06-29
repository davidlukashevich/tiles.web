const SUPABASE_URL = import.meta.env.VITE_API_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_API_SUPABASE_ANON_KEY

export type LeadPayload = {
    customer_name: string
    phone: string
    email?: string
    telegram_username?: string
    message?: string
    page_url?: string
    product_id?: string
    product_name?: string
    consent_personal_data: boolean
    consent_cross_border: boolean
    consent_policy_version?: string
    _hp?: string
}

export type SubmitLeadResponse = {
    ok: boolean
    id: string
    lead_number: number
}

export const submitLead = async (
    payload: LeadPayload,
): Promise<SubmitLeadResponse> => {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-lead`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
            email: "",
            telegram_username: "",
            message: "",
            page_url: "",
            product_id: "",
            product_name: "",
            _hp: "",
            ...payload,
        }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok || !data.ok) {
        throw new Error(data.error || "submit_failed")
    }

    return data as SubmitLeadResponse
}
