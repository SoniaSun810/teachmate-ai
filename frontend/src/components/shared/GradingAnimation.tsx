import { motion } from 'framer-motion'

const bookVariants = {
  animate: {
    rotate: [0, -8, 8, -8, 0],
    y: [0, -6, 0],
    transition: {
      rotate: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' as const },
      y: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' as const },
    },
  },
}

const floatDot = (delay: number) => ({
  animate: {
    y: [0, -8, 0],
    opacity: [0.4, 1, 0.4],
    transition: { repeat: Infinity, duration: 1, delay, ease: 'easeInOut' as const },
  },
})

export default function GradingAnimation({ label = 'AI 正在批改中…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        variants={bookVariants}
        animate="animate"
        className="text-6xl mb-6"
      >
        📖
      </motion.div>
      <p className="text-lg font-medium text-morandi-ink mb-1">{label}</p>
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            variants={floatDot(i * 0.2)}
            animate="animate"
            className="w-2.5 h-2.5 rounded-full bg-morandi-blue"
          />
        ))}
      </div>
      <p className="text-xs text-morandi-gray mt-4">正在分析作业内容、生成分项得分与评语…</p>
    </div>
  )
}
