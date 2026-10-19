import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GitCompare, User, Users, ArrowRight } from 'lucide-react'

const entries = [
  {
    to: '/demo',
    title: '需求对比演示',
    desc: '对比「需求不充分」与「需求充分」两个版本的 UI/交互差异',
    icon: GitCompare,
    color: 'from-morandi-purple-bg to-morandi-blue-bg',
    accent: 'text-morandi-purple',
  },
  {
    to: '/student',
    title: '学生端',
    desc: '提交作业 → AI 批改 → 查看分数与评语',
    icon: User,
    color: 'from-morandi-blue-bg to-morandi-green-bg',
    accent: 'text-morandi-blue',
  },
  {
    to: '/teacher',
    title: '老师端',
    desc: '查看全班分数、统计图表与批改状态',
    icon: Users,
    color: 'from-morandi-yellow-bg to-morandi-pink-bg',
    accent: 'text-morandi-yellow',
  },
]

export default function Landing() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="text-6xl mb-4">🦉</div>
        <h1 className="text-3xl md:text-4xl font-bold text-morandi-ink mb-3">
          AI 课程作业智能评阅系统
        </h1>
        <p className="text-morandi-gray max-w-xl mx-auto leading-relaxed">
          基于大语言模型的作业批改 Demo。本项目同时用于《软件工程》课程的
          <span className="text-morandi-pink font-medium">需求工程</span>
          教学演示——同一个功能，需求写得好不好，产品体验天差地别。
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {entries.map((e, i) => (
          <motion.div
            key={e.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={e.to}
              className={`block h-full rounded-3xl bg-gradient-to-br ${e.color} border border-morandi-gray-bg p-6 hover:shadow-soft-lg transition-all hover:-translate-y-1`}
            >
              <e.icon size={32} className={e.accent} />
              <h3 className="text-lg font-bold text-morandi-ink mt-4">{e.title}</h3>
              <p className="text-sm text-morandi-gray mt-2 leading-relaxed">{e.desc}</p>
              <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${e.accent}`}>
                进入 <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-5 rounded-2xl bg-morandi-gray-bg/60 border border-morandi-gray-bg text-center">
        <p className="text-xs text-morandi-gray">
          ⚙️ 当前为前端 Demo 阶段，数据均为 mock，未接入真实大模型。后端与 AI 批改功能将在后续迭代中实现。
        </p>
      </div>
    </div>
  )
}
