import type { GradingResult, RequirementItem, TeacherGradeRow } from '../types'

export const ASSIGNMENT_NAME = '软件工程 - 第三次课后作业：需求分析报告'

// ========== 老师端分数列表（mock） ==========
export const mockGrades: TeacherGradeRow[] = [
  { studentId: '20230001', studentName: '张三', assignmentName: ASSIGNMENT_NAME, score: 92, status: '已批改', submittedAt: '2026-10-12 14:32' },
  { studentId: '20230002', studentName: '李四', assignmentName: ASSIGNMENT_NAME, score: 85, status: '已批改', submittedAt: '2026-10-12 16:05' },
  { studentId: '20230003', studentName: '王五', assignmentName: ASSIGNMENT_NAME, score: 78, status: '已批改', submittedAt: '2026-10-13 09:18' },
  { studentId: '20230004', studentName: '赵六', assignmentName: ASSIGNMENT_NAME, score: 64, status: '已批改', submittedAt: '2026-10-13 11:47' },
  { studentId: '20230005', studentName: '钱七', assignmentName: ASSIGNMENT_NAME, score: null, status: '批改中', submittedAt: '2026-10-14 08:22' },
  { studentId: '20230006', studentName: '孙八', assignmentName: ASSIGNMENT_NAME, score: 88, status: '已批改', submittedAt: '2026-10-14 10:05' },
  { studentId: '20230007', studentName: '周九', assignmentName: ASSIGNMENT_NAME, score: 95, status: '已批改', submittedAt: '2026-10-14 15:30' },
  { studentId: '20230008', studentName: '吴十', assignmentName: ASSIGNMENT_NAME, score: null, status: '待提交', submittedAt: '-' },
  { studentId: '20230009', studentName: '郑十一', assignmentName: ASSIGNMENT_NAME, score: 71, status: '已批改', submittedAt: '2026-10-15 09:50' },
  { studentId: '20230010', studentName: '王十二', assignmentName: ASSIGNMENT_NAME, score: 83, status: '已批改', submittedAt: '2026-10-15 14:12' },
]

// ========== 需求清单（教学对比用） ==========
export const requirementsA: RequirementItem[] = [
  { text: '学生可以上传作业文件', good: false },
  { text: '系统会给出批改结果', good: false },
  { text: '老师可以看到分数', good: false },
]

export const requirementsB: RequirementItem[] = [
  { text: '仅支持 .pdf / .docx / .txt 格式文件', good: true },
  { text: '单个文件不超过 10MB', good: true },
  { text: '每次提交 1 ~ 5 个文件', good: true },
  { text: '提交后显示等待动画与进度提示', good: true },
  { text: '批改结果包含总分、分项得分、评语与改进建议', good: true },
  { text: '输入内容自动转义，防止脚本注入', good: true },
  { text: '文件上传失败给出明确的错误提示', good: true },
]

// ========== 模拟 AI 批改结果生成 ==========
export function generateGradingResult(studentName: string): GradingResult {
  const seed = studentName.length
  const total = 60 + ((seed * 7) % 40) // 60~99
  return {
    totalScore: total,
    maxScore: 100,
    dimensions: [
      { name: '需求完整性', score: Math.min(30, 20 + (seed % 10)), maxScore: 30, comment: '覆盖了主要功能需求，但部分非功能性需求描述不够具体。' },
      { name: '文档规范性', score: Math.min(25, 15 + ((seed * 3) % 10)), maxScore: 25, comment: '结构清晰，术语使用基本准确，存在少量格式不统一问题。' },
      { name: '可行性分析', score: Math.min(25, 18 + ((seed * 5) % 8)), maxScore: 25, comment: '技术选型合理，成本与进度估算有待细化。' },
      { name: '创新性', score: Math.min(20, 10 + ((seed * 2) % 10)), maxScore: 20, comment: '在交互设计上有一定亮点，可进一步挖掘用户痛点。' },
    ],
    overallComment: `${studentName}同学你好！这份需求分析报告整体完成度不错，功能需求梳理较为全面，文档结构清晰。建议在后续迭代中补充非功能性需求（性能、安全性）的量化指标，并完善用例的异常分支描述。继续加油！🎉`,
    suggestions: [
      '补充系统响应时间、并发用户数等性能指标',
      '为关键用例添加异常流程（alternative flow）',
      '统一全文术语，如「用户」与「客户」择一使用',
      '增加需求优先级标注（P0/P1/P2）',
    ],
    gradedAt: new Date().toLocaleString('zh-CN'),
  }
}
