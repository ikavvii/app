import Student from '../models/Student.js'

export async function addStudent (req, res) {
  try {
    console.log(req.body)

    const result = await Student.create(req.body)
    // console.log(result)
    // res
    //   .status(201)
    //   .json({ message: 'Student added successfully', student: result })

    res.redirect('/students')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getStudents (req, res) {
  try {
    const students = await Student.find()
    // res.json(students)
    res.render('index', { students })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function updateStudent (req, res) {
  try {
    const { roll } = req.params
    const updatedData = req.body
    // console.log(req.body);

    const result = await Student.findOneAndUpdate(
      { roll },
      { $set: updatedData },
      { new: true, runValidators: true }
    )
    if (!result) {
      return res.status(404).send('Student not found')
    }

    // res.json(result)
    res.redirect('/students')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function deleteStudent (req, res) {
  try {
    const { roll } = req.params

    const result = await Student.findOneAndDelete({ roll })

    if (!result) {
      return res.status(404).send('Student not found')
    }
    // res.json({ message: 'Student Deleted', student: result })
    res.redirect('/students')
  } catch (error) {
    res.status(500).send('Failed to delete student')
  }
}

export async function getStudentsBySkill (req, res) {
  try {
    const { search } = req.query
    const regex = new RegExp(search, 'i')
    const students = await Student.find({
      $or: [{ skills: regex }]
    })
    res.render('index', {
      search: 'Search results for "' + req.query.search + '"',
      students
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function getStudentByRoll (req, res) {
  try {
    const { roll } = req.params
    const student = await Student.findOne({ roll })
    if (!student) {
      // return res.status(404).send('Student not found')
      res.render('index', {
        search: 'Search results for "' + roll + '"',
        students: []
      })
      return
    }
    res.render('index', {
      search: 'Search results for "' + roll + '"',
      students: [student]
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function getDayScholars (req, res) {
  try {
    const students = await Student.find({ guardianPhoneNumber: '' })

    res.render('index', {
      filter: 'Filter by DayScholars',
      students
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function getHostelers (req, res) {
  try {
    const students = await Student.find({ guardianPhoneNumber: { $ne: '' } })
    res.render('index', {
      filter: 'Filter by Hostelers',
      students
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function openForm (req, res) {
  const { roll } = req.params
  if (roll) {
    // Edit form
    const student = await Student.findOne({ roll })
    if (!student) {
      return res.status(404).send('Student not found')
    }
    res.render('form', { student })
  } else {
    // Add form
    res.render('form', { student: null })
  }
}
