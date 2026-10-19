import { useState } from 'react'
import FileUploader from '../shared/FileUploader'
import GradingAnimation from '../shared/GradingAnimation'
import GradingResult from '../shared/GradingResult'
import Toast from '../shared/Toast'
import { generateGradingResult, ASSIGNMENT_NAME } from '../../data/mockData'
import type { FileMeta, GradingResult as GradingResultType } from '../../types'

/**
 * Tab B：需求充分版
 * - 标题清晰、说明明确
 * - 文件类型/大小/数量严格校验
 * - 姓名输入自动转义（防 XSS）
 * - 提交后显示可爱动画 + 成功提示
 * - 批改结果显示总分、分项得分、评语、改进建议
 */
export default function SubmissionFlowB() {
  const [name, setName] = useState('')
  const [files, setFiles] = useState<FileMeta[]>([])
  const [phase, setPhase] = useState<'idle' | 'grading' | 'done'>('idle')
  const [result, setResult] = useState<GradingResultType | null>(null)
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'warning' | 'info' }>({
    visible: false,
    message: '',
    type: 'info',
  })

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ visible: true, message, type })
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      showToast('请输入姓名', 'warning')
      return
    }
    if (files.length === 0) {
      showToast('请至少上传 1 个作业文件', 'warning')
      return
    }
    setPhase('grading')
    showToast('作业提交成功，AI 正在批改中…', 'success')
    setTimeout(() => {
      setResult(generateGradingResult(name.trim()))
      setPhase('done')
    }, 2800)
  }

  const handleReset = () => {
    setPhase('idle')
    setResult(null)
    setName('')
    setFiles([])
  }

  return (
    <div className="space-y-5">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {/* 清晰的标题与说明 */}
      <div className="p-4 rounded-2xl bg-morandi-blue-bg border border-morandi-blue-light">
        <h2 className="text-base font-bold text-morandi-ink">📝 {ASSIGNMENT_NAME}</h2>
        <p className="text-xs text-morandi-gray mt-1">
          请填写姓名并上传作业文件，提交后 AI 将自动为你批改并给出评语。
        </p>
      </div>

      {phase === 'idle' && (
        <>
          {/* 姓名输入：安全转义 */}
          <div>
            <label className="block text-sm text-morandi-ink mb-1 font-medium">
              姓名 <span className="text-morandi-pink">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入你的姓名"
              className="w-full px-4 py-2.5 rounded-xl border border-morandi-blue-light bg-white text-sm focus:outline-none focus:border-morandi-blue focus:ring-2 focus:ring-morandi-blue-bg transition-colors"
            />
            {name && (
              <p className="text-xs text-morandi-green mt-1">
                你好，{name} 👋（输入已安全处理）
              </p>
            )}
          </div>

          {/* 文件上传：严格校验 */}
          <FileUploader strict={true} files={files} onFilesChange={setFiles} />

          {/* 提交按钮 */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-morandi-blue text-white text-sm font-semibold hover:bg-morandi-purple transition-colors shadow-soft"
          >
            提交作业 🚀
          </button>
        </>
      )}

      {/* 可爱的批改等待动画 */}
      {phase === 'grading' && <GradingAnimation />}

      {/* 批改结果：完整结构化展示 */}
      {phase === 'done' && result && (
        <>
          <GradingResult result={result} showScore={true} />
          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl bg-morandi-gray-bg text-morandi-ink text-sm font-medium hover:bg-morandi-gray-light/40 transition-colors"
          >
            再提交一份
          </button>
        </>
      )}
    </div>
  )
}
