import { Router } from 'express'
import { getIssues, createIssue, getIssueById, getIssuesByTitle, updateIssue } from '../controllers/issues'

const router = Router()

router.get('/issues/search', getIssuesByTitle)
router.get('/issues/:id', getIssueById)
router.get('/issues', getIssues)
router.post('/issues', createIssue)
router.put('/issues/:id', updateIssue)

export default router
