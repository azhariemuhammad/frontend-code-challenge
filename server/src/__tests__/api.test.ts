import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Request, Response } from 'express'
import { getIssues, updateIssue } from '../controllers/issues'
import * as fs from 'fs/promises'
import path from 'path'

vi.mock('fs/promises')
vi.mock('path')

describe('Issue Controller', () => {
  const mockIssues = {
    issues: [
      {
        id: '1',
        imageUri: 'http://example.com/image1.jpg',
        title: 'First Issue',
        issueNumber: 1,
        issueDate: '2024-01-01',
      },
      {
        id: '2',
        imageUri: 'http://example.com/image2.jpg',
        title: 'Second Issue',
        issueNumber: 2,
        issueDate: '2024-02-01',
      },
    ],
  }

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(path.join).mockReturnValue('/mock/path/db.json')
    vi.mocked(fs.stat).mockResolvedValue({ mtimeMs: Date.now() } as any)
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockIssues))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve all issues when no query is provided', async () => {
    const req = { query: {} } as Request
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response

    await getIssues(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockIssues)
  })

  it('should filter issues by title when a query is provided', async () => {
    const req = { query: { q: 'first' } } as unknown as Request
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response

    await getIssues(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      issues: [mockIssues.issues[0]],
    })
  })

  it('should update issue', async () => {
    const req = {
      body: {
        id: '1',
        imageUri: 'http://example.com/image1.jpg',
        title: 'Updated First Issue',
        issueNumber: 1,
        issueDate: '2024-01-01',
      },
    } as unknown as Request

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    await updateIssue(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      issues: [
        {
          id: '2',
          imageUri: 'http://example.com/image2.jpg',
          title: 'Second Issue',
          issueNumber: 2,
          issueDate: '2024-02-01',
        },
        {
          id: '1',
          imageUri: 'http://example.com/image1.jpg',
          title: 'Updated First Issue',
          issueNumber: 1,
          issueDate: '2024-01-01',
        },
      ],
    })
  })
})
