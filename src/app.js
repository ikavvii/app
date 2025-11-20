import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import connectDatabase from './config/database.js'
import studentsRouter from './routes/studentsRoute.js'
import methodOverride from 'method-override'
import notFoundHandler from './middlewares/404.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, '../', 'node_modules', 'bootstrap', 'dist'))
)

app.use('/students', studentsRouter)

app.get('/', (req, res) => {
  res.redirect('/students')
})

app.use(notFoundHandler)
app.use(errorHandler)

export default app
