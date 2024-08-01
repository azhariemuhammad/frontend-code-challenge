export type Issue = {
  id: string
  imageUri: string
  title: string
  issueNumber: number
  issueDate: string
  description?: string
}

export type IssueList = Array<Issue>
