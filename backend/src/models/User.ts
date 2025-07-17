import bcrypt from 'bcryptjs';
import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
  id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  location?: string;
  joinDate: Date;
  resume?: mongoose.Types.ObjectId;
  autoEmbed: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: String,
    joinDate: { type: Date, default: Date.now },
    autoEmbed: {
      type: Boolean,
      default: false,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
