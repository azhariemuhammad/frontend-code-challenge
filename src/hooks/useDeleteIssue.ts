import { config } from '../config'

export const useDeleteIssue = () => {
  const deleteIssue = async (id: string, onSuccess?: () => void) => {
    const response = await fetch(`${config.apiUrl}/api/v1/issues/${id}`, {
      method: 'DELETE',
    })
    if (onSuccess) {
      onSuccess()
    }
    return response.json()
  }

  return deleteIssue
}
