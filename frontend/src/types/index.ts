export interface FileMeta {
  name: string
  size: number // bytes
  type: string
}

export interface Submission {
  id: string
  studentName: string
  studentId: string
  assignmentName: string
  files: FileMeta[]
  submittedAt: string
}

export interface DimensionScore {
  name: string
  score: number
  maxScore: number
  comment: string
}

export interface GradingResult {
  totalScore: number
  maxScore: number
  dimensions: DimensionScore[]
  overallComment: string
  suggestions: string[]
  gradedAt: string
}

export type GradeStatus = '已批改' | '批改中' | '待提交'

export interface TeacherGradeRow {
  studentId: string
  studentName: string
  assignmentName: string
  score: number | null
  status: GradeStatus
  submittedAt: string
}

export interface RequirementItem {
  text: string
  good: boolean
}
