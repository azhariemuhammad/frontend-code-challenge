import { Issue } from '../types'
import { config } from '../config'

export const useUpdateNewIssue = () => {
  const updateNewIssue = async (issue: Issue, onSuccess?: () => void) => {
    const response = await fetch(`${config.apiUrl}/api/v1/issues/${issue.id}`, {
      method: 'PUT',
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

  return updateNewIssue
}
