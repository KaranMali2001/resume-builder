export interface Module {
  id: string
  title: string
  completed: boolean
  description?: string
  order: number
}

export interface Course {
  id: string
  title: string
  progress: number
  skills: string[]
  completionDate?: string
  status: "active" | "completed"
  modules: Module[]
  embedded: boolean
}

export interface ResumeData {
  _id: string
  userId: string
  personalInfo:   {
    name: string
    email: string
    phone?: string
    location?: string
  }
  skills: string[]
  courses: Course[]
  createdAt: string
  updatedAt: string
  __v: number
}


