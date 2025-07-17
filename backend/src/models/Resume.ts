import mongoose, { Schema } from 'mongoose';

const ResumeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    personalInfo: {
      type: new mongoose.Schema(
        {
          name: { type: String, required: true },
          email: { type: String, required: true },
          location: { type: String },
        },
        { _id: false },
      ),
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    courses: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
        achivements: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;
