import { Issue } from '../types'
import { config } from '../config'

export const useCreateNewIssue = () => {
  const createNewIssue = async (issue: Omit<Issue, 'id'>, onSuccess?: () => void) => {
    const response = await fetch(`${config.apiUrl}/api/v1/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issue),
    })

    if (onSuccess) {
      onSuccess()
    }
    return response.json()
  }

  return createNewIssue
}
