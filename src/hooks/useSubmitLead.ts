import { useMutation } from "@tanstack/react-query"
import { submitLead } from "../api/lead.api"

export const useSubmitLead = () => {
  return useMutation({
    mutationFn: submitLead,
  })
}
