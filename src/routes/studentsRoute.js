import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent
} from '../controllers/studentsController.js'

const studentsRouter = Router()

studentsRouter.get('/', getStudents)

studentsRouter.post('/', addStudent)

studentsRouter.patch('/:roll', updateStudent)

studentsRouter.delete('/:roll', deleteStudent)

export default studentsRouter
