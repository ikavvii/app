import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import connectDatabase from './config/database.js'
import studentsRouter from './routes/studentsRoute.js'
const app = express()

connectDatabase()

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/students', studentsRouter)

app.get('/', (req, res) => {
  res.redirect('/students')
})

export default app
