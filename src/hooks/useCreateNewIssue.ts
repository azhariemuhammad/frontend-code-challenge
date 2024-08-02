import { Issue } from '../types'
import { config } from '../config'
import { useAlertContext } from '../components/AlertContext'

export const useCreateNewIssue = () => {
  const { addAlert } = useAlertContext()
  const createNewIssue = async (issue: Omit<Issue, 'id'>, onSuccess?: () => void) => {
    try {
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
    } catch (error) {
      console.error(error)
      addAlert({
        status: 'error',
        message: 'Error creating issue',
      })
    }
  }

  return createNewIssue
}
