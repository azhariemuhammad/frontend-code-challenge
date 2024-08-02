import { Issue } from '../types'
import { config } from '../config'
import { useAlertContext } from '../components/AlertContext'

export const useUpdateNewIssue = () => {
  const { addAlert } = useAlertContext()
  const updateNewIssue = async (issue: Issue, onSuccess?: () => void) => {
    try {
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
    } catch (error) {
      console.error(error)
      addAlert({
        status: 'error',
        message: 'Error updating issue',
      })
    }
  }

  return updateNewIssue
}
