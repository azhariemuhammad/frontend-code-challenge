import { Router } from 'express'
import { getIssues, createIssue, deleteIssueById, getIssueById, updateIssue } from '../controllers/issues'

const router = Router()

router.get('/issues/:id', getIssueById)
router.get('/issues', getIssues)
router.post('/issues', createIssue)
router.put('/issues/:id', updateIssue)
router.delete('/issues/:id', deleteIssueById)

export default router
