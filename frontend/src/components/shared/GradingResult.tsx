import { motion } from 'framer-motion'
import { CheckCircle2, Lightbulb, Sparkles } from 'lucide-react'
import type { GradingResult as GradingResultType } from '../../types'

interface GradingResultProps {
  result: GradingResultType
  showScore?: boolean // Tab B: true; Tab A: false
}

export default function GradingResult({ result, showScore = true }: GradingResultProps) {
  // ========== Tab A 需求不充分版：不显示分数，只给模糊评语 ==========
  if (!showScore) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-morandi-gray-bg border border-morandi-gray-light"
      >
        <p className="text-sm text-morandi-gray leading-relaxed">
          你的作业已经收到了。整体还行吧，有些地方可以再改改。具体分数请等待老师通知。
        </p>
      </motion.div>
    )
  }

  // ========== Tab B 需求充分版：结构化结果 ==========
  const scoreColor =
    result.totalScore >= 90
      ? 'text-morandi-green'
      : result.totalScore >= 60
        ? 'text-morandi-blue'
        : 'text-morandi-pink'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* 总分卡片 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-morandi-blue-bg to-morandi-purple-bg p-6 border border-morandi-blue-light">
        <div className="absolute -right-4 -top-4 text-6xl opacity-20">🎉</div>
        <div className="flex items-center justify-between relative">
          <div>
            <p className="text-sm text-morandi-gray mb-1">AI 批改总分</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-bold ${scoreColor}`}>{result.totalScore}</span>
              <span className="text-xl text-morandi-gray">/ {result.maxScore}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-morandi-gray">批改时间</p>
            <p className="text-sm text-morandi-ink">{result.gradedAt}</p>
          </div>
        </div>
      </div>

      {/* 分项得分 */}
      <div className="rounded-2xl bg-white border border-morandi-blue-light p-5">
        <h3 className="text-sm font-semibold text-morandi-ink mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-morandi-purple" /> 分项得分
        </h3>
        <div className="space-y-4">
          {result.dimensions.map((dim, i) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-morandi-ink">{dim.name}</span>
                <span className="text-sm font-medium text-morandi-ink">
                  {dim.score} <span className="text-morandi-gray">/ {dim.maxScore}</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-morandi-gray-bg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-morandi-blue to-morandi-purple"
                />
              </div>
              <p className="text-xs text-morandi-gray mt-1">{dim.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 总评语 */}
      <div className="rounded-2xl bg-morandi-green-bg border border-morandi-green-light p-5">
        <h3 className="text-sm font-semibold text-morandi-ink mb-2 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-morandi-green" /> 总体评语
        </h3>
        <p className="text-sm text-morandi-ink leading-relaxed whitespace-pre-line">
          {result.overallComment}
        </p>
      </div>

      {/* 改进建议 */}
      <div className="rounded-2xl bg-morandi-yellow-bg border border-morandi-yellow-light p-5">
        <h3 className="text-sm font-semibold text-morandi-ink mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-morandi-yellow" /> 改进建议
        </h3>
        <ul className="space-y-2">
          {result.suggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-morandi-ink">
              <span className="text-morandi-yellow font-bold">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
