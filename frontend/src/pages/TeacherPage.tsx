import StatsSummary from '../components/teacher/StatsSummary'
import GradesTable from '../components/teacher/GradesTable'

export default function TeacherPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-morandi-ink">老师端 · 批改总览</h1>
        <p className="text-sm text-morandi-gray mt-1">
          查看学生提交情况、分数统计与批改状态
        </p>
      </div>
      <div className="space-y-6">
        <StatsSummary />
        <GradesTable />
      </div>
    </div>
  )
}
