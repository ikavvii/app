import { model, Schema } from 'mongoose'

const SKILLS_ENUM = [
  'dancing',
  'drawing',
  'painting',
  'singing',
  'story writing',
  'playing chess',
  'playing cricket',
  'playing soccer',
  'performing orchestra',
  'coding'
]

const StudentSchema = new Schema(
  {
    roll: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: v => /^25MX/.test(v),
        message: props => `${props.value} should start with '25MX'.`
      }
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50
    },
    guardianPhoneNumber: {
      type: String,
      required: false,
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    skills: {
      type: [{ type: String, enum: SKILLS_ENUM }],
      default: [],
      validate: [
        {
          validator: arr => Array.isArray(arr),
          message: 'Skills must be an array'
        },
        {
          validator: arr => arr.length > 0,
          message: 'At least one skill is required'
        },
        {
          validator: arr => new Set(arr).size === arr.length,
          message: 'Skill must not contain duplicates'
        }
      ]
    }
  },
  { timestamps: true }
)

export default model('Student', StudentSchema)
