import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  openForm,
  getStudentsBySkill,
  getStudentByRoll,
  getDayScholars,
  getHostelers
} from '../controllers/studentsController.js'

const studentsRouter = Router()

studentsRouter.get(
  '/',
  (req, res, next) => {
    if (req.query.search) {
      if (/^25MX/i.test(req.query.search)) {
        req.params.roll = req.query.search.toUpperCase()
        return getStudentByRoll(req, res)
      }
      return getStudentsBySkill(req, res)
    }
    next()
  },
  (req, res, next) => {
    if (req.query.filter) {
      if (req.query.filter === 'dayscholars') {
        return getDayScholars(req, res)
      } else if (req.query.filter === 'hostelers') {
        return getHostelers(req, res)
      }
    }
    next()
  },
  getStudents
)

studentsRouter.post('/', addStudent)

studentsRouter.get('/new', openForm)
studentsRouter.get('/:roll', openForm)

studentsRouter.patch('/:roll', updateStudent)

studentsRouter.delete('/:roll', deleteStudent)

export default studentsRouter
