import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import fs from 'fs/promises'
import path from 'path'
import Joi from 'joi'
import { Issue } from '../models/types'

let issuesCache: { issues: Issue[] } | null = null
let lastModified: number = 0

const DB_PATH = path.join(__dirname, '../../db/db.json')

const readIssuesFromFile = async (): Promise<{ issues: Issue[] }> => {
  try {
    const stats = await fs.stat(DB_PATH)
    if (issuesCache === null || stats?.mtimeMs > lastModified) {
      const data = await fs.readFile(DB_PATH, 'utf8')
      if (data) {
        issuesCache = JSON.parse(data)
        lastModified = stats?.mtimeMs
      }
    }

    return issuesCache || { issues: [] }
  } catch (error) {
    console.error('Error reading issues file:', error)
    throw error
  }
}

export const getIssues = async (req: Request, res: Response) => {
  const query = req.query.q as string
  try {
    const issues = await readIssuesFromFile()
    if (query) {
      const issuesByTitle = issues.issues.reduce((acc: Array<Issue>, issue: Issue) => {
        if (issue.title.toLowerCase().includes(query.toLowerCase())) {
          acc = [...acc, issue]
        }
        return acc
      }, [])
      res.status(200).json({ issues: issuesByTitle })
      return
    }
    res.status(200).json(issues)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving issues' })
  }
}

export const getIssueById = async (req: Request, res: Response) => {
  try {
    const data = await readIssuesFromFile()
    const issue = data.issues.find((issue: Issue) => issue.id === req.params.id)
    if (!issue) {
      res.status(404).json({ error: 'Issue not found' })
    } else {
      res.status(200).json(issue)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error retrieving issue' })
  }
}

const issueSchema = Joi.object({
  imageUri: Joi.string().required(),
  title: Joi.string().required(),
  issueNumber: Joi.number().required(),
  issueDate: Joi.string().required(),
})

export const createIssue = async (req: Request, res: Response) => {
  try {
    const { imageUri, title, issueNumber, issueDate } = req.body
    const data = await readIssuesFromFile()

    const { error } = issueSchema.validate({ imageUri, title, issueNumber, issueDate })

    if (error) {
      return res.status(400).send(error.message)
    }

    const newData = {
      issues: [{ id: uuid(), imageUri, title, issueNumber, issueDate }, ...data.issues],
    }
    await fs.writeFile(DB_PATH, JSON.stringify(newData))
    res.status(201).json(newData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating issue' })
  }
}

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id, imageUri, title, issueNumber, issueDate } = req.body
    const data = await readIssuesFromFile()

    const issue = data.issues.find((issue: Issue) => issue.id === id)
    if (!issue) {
      res.status(404).json({ error: `Issue with id ${id} not found` })
    } else {
      const newData = {
        issues: [
          ...data.issues.filter((issue: Issue) => issue.id !== id),
          { id, imageUri, title, issueNumber, issueDate },
        ],
      }
      await fs.writeFile(DB_PATH, JSON.stringify(newData))
      res.status(200).json(newData)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error updating issue' })
  }
}

export const deleteIssueById = async (req: Request, res: Response) => {
  try {
    const data = await readIssuesFromFile()
    const issue = data.issues.find((issue: Issue) => issue.id === req.params.id)
    if (!issue) {
      res.status(404).json({ error: 'Issue not found' })
    } else {
      const newData = {
        issues: [...data.issues.filter((issue: Issue) => issue.id !== req.params.id)],
      }
      await fs.writeFile(DB_PATH, JSON.stringify(newData))
      res.status(200).json(newData)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting issue' })
  }
}
