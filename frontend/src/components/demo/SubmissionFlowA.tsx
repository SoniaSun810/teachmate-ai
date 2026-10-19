import { useState } from 'react'
import FileUploader from '../shared/FileUploader'
import GradingResult from '../shared/GradingResult'
import { generateGradingResult } from '../../data/mockData'
import type { FileMeta, GradingResult as GradingResultType } from '../../types'

/**
 * Tab A：需求不充分版
 * - 标题模糊、说明矛盾
 * - 无文件类型/大小/数量限制
 * - 姓名输入不做转义（演示 XSS 风险）
 * - 提交后无任何反馈（无动画、无提示）
 * - 批改结果不显示分数，只给模糊评语
 */
export default function SubmissionFlowA() {
  const [name, setName] = useState('')
  const [files, setFiles] = useState<FileMeta[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<GradingResultType | null>(null)

  const handleSubmit = () => {
    // 需求不充分：提交后无任何反馈，学生不知道是否成功
    setSubmitted(true)
    // 假装静默等待，没有动画、没有提示
    setTimeout(() => {
      setResult(generateGradingResult(name || '同学'))
    }, 2500)
  }

  return (
    <div className="space-y-5">
      {/* 模糊自相矛盾的标题 */}
      <div className="p-4 rounded-2xl bg-morandi-gray-bg border border-morandi-gray-light">
        <h2 className="text-base font-bold text-morandi-ink">提交作业（不知道要交什么）</h2>
        <p className="text-xs text-morandi-gray mt-1">
          请上传文件。也可以不上传。随便。
        </p>
      </div>

      {/* 姓名输入：不做转义，直接渲染 —— 演示 XSS */}
      <div>
        <label className="block text-sm text-morandi-gray mb-1">姓名</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入姓名"
          className="w-full px-4 py-2.5 rounded-xl border border-morandi-gray-light bg-white text-sm focus:outline-none"
        />
        {name && (
          <p className="text-xs text-morandi-pink mt-1">
            你输入的是：
            {/* 危险：直接插入 HTML（演示 XSS） */}
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </p>
        )}
      </div>

      {/* 文件上传：无任何限制 */}
      <FileUploader strict={false} files={files} onFilesChange={setFiles} />

      {/* 提交按钮：点击后无反馈 */}
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="w-full py-3 rounded-xl bg-morandi-gray text-white text-sm font-medium hover:bg-morandi-gray-light transition-colors disabled:opacity-50"
      >
        {submitted ? '提交中…' : '提交作业'}
      </button>

      {/* 提交后：没有加载动画，也没有提示，学生一脸懵 */}
      {submitted && !result && (
        <div className="p-4 rounded-2xl border border-morandi-gray-light bg-white">
          <p className="text-sm text-morandi-gray">（页面没有任何变化…到底交上去了吗？😰）</p>
        </div>
      )}

      {/* 批改结果：不显示分数，只给模糊评语 */}
      {result && <GradingResult result={result} showScore={false} />}
    </div>
  )
}
