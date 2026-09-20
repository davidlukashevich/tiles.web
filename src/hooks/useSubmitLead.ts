import { useMutation } from "@tanstack/react-query"

import { submitLead } from "../api/lead.api"
import { GOAL_LEAD_SENT, trackGoal } from "../helpers/metrika"

export const useSubmitLead = () => {
  return useMutation({
    mutationFn: submitLead,
    // Цель засчитывается только после ответа сервера: отправленная, но
    // не принятая заявка — это не заявка.
    onSuccess: (data) => {
      trackGoal(GOAL_LEAD_SENT, { lead_number: data.lead_number })
    },
  })
}
