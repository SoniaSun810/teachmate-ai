import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubmissionFlowA from './SubmissionFlowA'
import SubmissionFlowB from './SubmissionFlowB'
import RequirementsCard from './RequirementsCard'
import { requirementsA, requirementsB } from '../../data/mockData'

type Tab = 'A' | 'B'

export default function DemoCompare() {
  const [tab, setTab] = useState<Tab>('A')

  return (
    <div className="space-y-6">
      {/* Tab 切换器 */}
      <div className="flex gap-2 p-1.5 bg-morandi-gray-bg rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setTab('A')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'A'
              ? 'bg-morandi-pink text-white shadow-soft'
              : 'text-morandi-gray hover:text-morandi-ink'
          }`}
        >
          Tab A · 需求不充分版
        </button>
        <button
          onClick={() => setTab('B')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'B'
              ? 'bg-morandi-green text-white shadow-soft'
              : 'text-morandi-gray hover:text-morandi-ink'
          }`}
        >
          Tab B · 需求充分版
        </button>
      </div>

      {/* 内容区：左右双栏，左边需求清单，右边提交界面 */}
      <div className="grid md:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'A' ? (
                <RequirementsCard
                  title="需求清单（不充分）"
                  items={requirementsA}
                  good={false}
                />
              ) : (
                <RequirementsCard
                  title="需求清单（充分）"
                  items={requirementsB}
                  good={true}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* 教学提示 */}
          <div className="p-4 rounded-2xl bg-morandi-purple-bg border border-morandi-purple-light">
            <p className="text-xs text-morandi-ink leading-relaxed">
              💡 <strong>观察要点：</strong>切换两个 Tab，对比同一功能在不同需求质量下的用户体验差异。
              需求写得越清晰、约束越明确，产品越好用、越安全。
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-morandi-gray-bg p-6 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === 'A' ? <SubmissionFlowA /> : <SubmissionFlowB />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
