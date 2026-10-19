import { useMemo } from 'react'
import { Users, CheckCircle2, TrendingUp, Award } from 'lucide-react'
import { mockGrades } from '../../data/mockData'

export default function StatsSummary() {
  const stats = useMemo(() => {
    const total = mockGrades.length
    const graded = mockGrades.filter((r) => r.status === '已批改')
    const scores = graded.map((r) => r.score as number)
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    const passCount = scores.filter((s) => s >= 60).length
    const passRate = scores.length ? Math.round((passCount / scores.length) * 100) : 0

    // 分数段分布
    const buckets = [
      { label: '90-100', range: [90, 100], count: 0, color: 'bg-morandi-green' },
      { label: '80-89', range: [80, 89], count: 0, color: 'bg-morandi-blue' },
      { label: '70-79', range: [70, 79], count: 0, color: 'bg-morandi-purple' },
      { label: '60-69', range: [60, 69], count: 0, color: 'bg-morandi-yellow' },
      { label: '<60', range: [0, 59], count: 0, color: 'bg-morandi-pink' },
    ]
    for (const s of scores) {
      const b = buckets.find((b) => s >= b.range[0] && s <= b.range[1])
      if (b) b.count++
    }
    const maxCount = Math.max(...buckets.map((b) => b.count), 1)

    return { total, gradedCount: graded.length, avg, passRate, buckets, maxCount }
  }, [])

  const cards = [
    { label: '应提交人数', value: stats.total, icon: Users, color: 'text-morandi-blue', bg: 'bg-morandi-blue-bg' },
    { label: '已批改', value: stats.gradedCount, icon: CheckCircle2, color: 'text-morandi-green', bg: 'bg-morandi-green-bg' },
    { label: '平均分', value: stats.avg, icon: TrendingUp, color: 'text-morandi-purple', bg: 'bg-morandi-purple-bg' },
    { label: '及格率', value: `${stats.passRate}%`, icon: Award, color: 'text-morandi-yellow', bg: 'bg-morandi-yellow-bg' },
  ]

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl ${c.bg} border border-morandi-gray-bg p-5`}>
            <c.icon size={20} className={c.color} />
            <p className="text-2xl font-bold text-morandi-ink mt-2">{c.value}</p>
            <p className="text-xs text-morandi-gray mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* 分数段分布图 */}
      <div className="rounded-2xl bg-white border border-morandi-gray-bg p-5 shadow-soft">
        <h3 className="text-sm font-semibold text-morandi-ink mb-4">📊 分数段分布</h3>
        <div className="flex items-end gap-3 h-40">
          {stats.buckets.map((b) => (
            <div key={b.label} className="flex-1 flex flex-col items-center justify-end gap-2">
              <span className="text-xs font-medium text-morandi-ink">{b.count}</span>
              <div
                className={`w-full rounded-t-lg ${b.color} transition-all`}
                style={{ height: `${(b.count / stats.maxCount) * 100}%`, minHeight: b.count > 0 ? '8px' : '2px' }}
              />
              <span className="text-xs text-morandi-gray">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
