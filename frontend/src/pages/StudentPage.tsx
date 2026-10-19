import SubmissionFlowB from '../components/demo/SubmissionFlowB'

export default function StudentPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-morandi-ink">学生端 · 提交作业</h1>
        <p className="text-sm text-morandi-gray mt-1">
          上传作业文件，AI 将自动为你批改并给出分数与评语
        </p>
      </div>
      <div className="rounded-2xl bg-white border border-morandi-gray-bg p-6 shadow-soft">
        <SubmissionFlowB />
      </div>
    </div>
  )
}
