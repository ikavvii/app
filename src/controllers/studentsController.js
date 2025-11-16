import Student from '../models/Student.js'

export async function addStudent (req, res) {
  try {
    console.log(req.body)

    const result = await Student.create(req.body)
    console.log(result)
    res
      .status(201)
      .json({ message: 'Student added successfully', student: result })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function getStudents (req, res) {
  try {
    const students = await Student.find()
    // res.json(students)
    res.render('index', { students })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateStudent (req, res) {
  try {
    const { roll } = req.params
    const updatedData = req.body

    const result = await Student.findOneAndUpdate(
      { roll },
      { $set: updatedData },
      { new: true, runValidators: true }
    )
    if (!result) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function deleteStudent (req, res) {
  try {
    const { roll } = req.params

    const result = await Student.findOneAndDelete({ roll })

    if (!result) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json({ message: 'Student Deleted', student: result })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' })
  }
}

export async function getStudentsBySkill (req, res) {
  // search
}

export async function getStudentByRoll (req, res) {
  // view
}

export async function getDayScholars (req, res) {
  // filter 1
}

export async function getHostelers (req, res) {
  // filter 2
}
