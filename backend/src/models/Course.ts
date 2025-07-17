import mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    embedded: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
    skills: [
      {
        type: String,
      },
    ],
    modules: [
      {
        title: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        description: String,
        order: {
          type: Number,
          required: true,
        },
      },
    ],
    completionDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = mongoose.model('Course', CourseSchema);
